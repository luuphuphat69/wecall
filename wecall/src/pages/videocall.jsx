import React, { useState, useEffect, useRef } from "react";

const VideoCall = () => {
  
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);

  /* camera and micro permission */
  const init = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setLocalStream(stream);
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
      <video className="video-player" id="user-2" autoPlay playsInline />
    </div>
  );
};

export default VideoCall;
