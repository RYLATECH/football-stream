import Hls from "hls.js";
import { useEffect, useRef } from "react";

function LiveStream({ url }) {
  const videoRef = useRef();

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else {
      videoRef.current.src = url;
    }
  }, [url]);

  return <video ref={videoRef} controls autoPlay style={{width: '100%'}} />;
}

export default LiveStream;
