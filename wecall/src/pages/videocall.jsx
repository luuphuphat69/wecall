import React, { useState, useEffect, useRef } from "react";


/**
 * To acquire and communicate streaming data, WebRTC implements the following APIs:
      MediaStream gets access to data streams, such as from the user's camera and microphone.
      RTCPeerConnection enables audio or video calling with facilities for encryption and bandwidth management.
      RTCDataChannel enables peer-to-peer communication of generic data.
    (There is detailed discussion of the network and signaling aspects of WebRTC later.)
 */
const VideoCall = () => {

  const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', "stun:stun2.l.google.com:19302"]
      },
    ]
  };

  let peerConnection = new RTCPeerConnection(servers);
  const [remoteStream, setRemoteStream] = useState();
  const [localStream, setLocalStream] = useState();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const handleMediaStream = async () => {
    try {
      let localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      let remoteStream = new MediaStream();

      if (localStream && localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      // Push tracks from local stream to peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      // Pull track from remote stream, add to video stream
      peerConnection.ontrack = event =>{
        event.streams[0].getTracks().forEach(track =>{
          remoteStream.addTrack(track);
        });
      };
      setRemoteStream(remoteStream);
      setLocalStream(localStream);

      createOffer();
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };
  

  /**
   * When starting the signaling process, an offer is created by the user initiating the call.
   * This offer includes a session description, in SDP format, and needs to be delivered to 
   * the receiving user, which we'll call the callee. 
   */
  const createOffer = async () => {
    const offer = await peerConnection.createOffer();
    console.log("SDP Offer:", offer);
    await peerConnection.setLocalDescription(offer);
    
    //After setLocalDescription(), the caller asks STUN servers to generate the ice candidates
    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log("ICE Candidate: ", event.candidate);
      }
    };
  };

  const answerOffer = async () => {
  }

  useEffect(() => {
    handleMediaStream();
  }, []); // Run the initialization effect once when the component mounts

  return (
    <div id="videos">
      {localStream ? <video className="video-player" id="user-1" ref={localVideoRef} autoPlay playsInline /> : <video className="video-player" id="user-1" autoPlay playsInline />}
      {/* {console.log(localVideoRef.current)} */}
      {remoteStream ? <video className="video-player" id="user-2" ref={remoteVideoRef} autoPlay playsInline /> : <video className="video-player" id="user-2" autoPlay playsInline />}
    </div>
  );
};

export default VideoCall;