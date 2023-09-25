import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useState, useCallback, useRef } from 'react';

const OilSlickWebcamTexture = ({ handleDrawImage, video }) => {

  const [ videoIsReady, setVideoIsReady ] = useState(false);
  const raf = useRef(null);
  const { webcamAllowed, setWebcamAllowed } = useSiteGlobals();

  console.log('webcamAllowed', webcamAllowed);

  const loop = useCallback(() => {
    if (webcamAllowed === true) {
      handleDrawImage(video.current, true);
    }
    
    if (webcamAllowed === true) {
      raf.current = requestAnimationFrame(loop);
    }
  }, [ video, handleDrawImage, webcamAllowed ]);
    
  useEffect(() => {
    if (videoIsReady && webcamAllowed === true) {
      raf.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf.current);
    }
  }, [ videoIsReady, webcamAllowed, loop ]);
  

  // start recording from the webcam
  useEffect(() => {
      // We can't `new Video()` yet, so we'll resort to the vintage
      // "hidden div" hack for dynamic loading.

    // If we don't do this, the stream will not be played.
    // By the way, the play and pause controls work as usual
    // for streamed videos.
    video.current.setAttribute('autoplay', '1')
    video.current.setAttribute('playsinline', '1'); // important for iPhones
    video.current.setAttribute('muted', '1');

    // The video should fill out all of the canvas
    video.current.setAttribute('width', 0.5)
    video.current.setAttribute('height', 0.5)

    // As soon as we can draw a new frame on the canvas, we call the `draw` function
    // we passed as a parameter.

    // The callback happens when we are starting to stream the video.current.
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        frameRate: { ideal: 10, max: 12 },
        width: { max: 128 },
        height: { max: 128 / 16 * 9 }
    }, audio: false }).then(function (stream) {
      // Yay, now our webcam input is treated as a normal video and
      // we can start having fun
      video.current.srcObject = stream;
      setVideoIsReady(true);
      setWebcamAllowed(true);
    }, function (err) {
      throw err;
    }).catch((error) => {
      setWebcamAllowed(false);
    });

    const handleFirstInteraction = () => {
      video.current.play()
        .then(() => {
          window.removeEventListener('touchstart', handleFirstInteraction);
          window.removeEventListener('click', handleFirstInteraction);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('click', handleFirstInteraction);

    return () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    }
  }, [ video, handleDrawImage ]);
  
  return null;
};

export default OilSlickWebcamTexture;