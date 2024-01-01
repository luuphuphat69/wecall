import React, { useState, useEffect, useRef } from "react";


/**
 * To acquire and communicate streaming data, WebRTC implements the following APIs:
      MediaStream gets access to data streams, such as from the user's camera and microphone.
      RTCPeerConnection enables audio or video calling with facilities for encryption and bandwidth management.
      RTCDataChannel enables peer-to-peer communication of generic data.
    (There is detailed discussion of the network and signaling aspects of WebRTC later.)
 */

const VideoCall = () => {
  
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  /* camera and micro permission */
  const init = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setLocalStream(stream);

      createOffer();
      
    } catch (error) {
      if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        console.error('Camera not found on the device.');
      } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        console.error('Permission to access camera was denied.');
      } else {
        console.error('Error accessing media devices:', error);
      }
    }
  };

  const createOffer = async () => {
    // Use state to manage peerConnection
    const newPeerConnection = new RTCPeerConnection();
    setPeerConnection(newPeerConnection);

    const newRemoteStream = new MediaStream();
    setRemoteStream(newRemoteStream);

    const offer = await newPeerConnection.createOffer();
    await newPeerConnection.setLocalDescription(offer);
    console.log(offer);
  };

  useEffect(() => {
    init();
  }, []); // Run the initialization effect once when the component mounts

  useEffect(() => {
    // Set the srcObject property when localStream changes
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <div id="videos">
      {localStream ? <video className="video-player" id="user-1" ref={localVideoRef} autoPlay playsInline /> : <video className="video-player" id="user-1" autoPlay playsInline />}
      {remoteStream ? <video className="video-player" id="user-2" ref={remoteVideoRef} autoPlay playsInline /> : <video className="video-player" id="user-2" autoPlay playsInline />}
    </div>
  );
};

export default VideoCall;
