import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useRef, useState } from 'react';

const WebcamTexture = ({ texture1Canvas, texture2Canvas, texture1CanvasCtx, texture2CanvasCtx, vignetteCanvas, texture1, texture2 }) => {
  
  const { backgroundImage } = useSiteGlobals();
  const [ isInitialised, setIsInitialised ] = useState(false);
  const video = useRef(document.createElement('video'));

  useEffect(() => {

    let raf;

    console.log(video.current);

    const update = function () {
      // As soon as we can draw a new frame on the canvas, we call the `draw` function
      // we passed as a parameter.
    console.log('WebcamTexture: useEffect: start recording from the webcam');
      let last = Date.now();
      const loop = () => {
      console.log('WebcamTexture: useEffect: start recording from the webcam');
        // For some effects, you might want to know how much time is passed
        // since the last frame; that's why we pass along a Delta time `dt`
        // variable (expressed in milliseconds)
        const dt = Date.now() - last;
        // self.callback(self.video, dt)
        last = Date.now();
        texture1CanvasCtx.current.drawImage(video.current, 0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
        texture2CanvasCtx.current.drawImage(video.current, 0, 0, texture1Canvas.current.width, texture1Canvas.current.height);

        texture1CanvasCtx.current.drawImage(vignetteCanvas.current, 0, 0, vignetteCanvas.current.width, vignetteCanvas.current.height, 0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
        texture2CanvasCtx.current.drawImage(vignetteCanvas.current, 0, 0, vignetteCanvas.current.width, vignetteCanvas.current.height, 0, 0, texture2Canvas.current.width, texture2Canvas.current.height);
        texture1.current.needsUpdate = true;
        texture2.current.needsUpdate = true;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    if (backgroundImage === 'webcam' && isInitialised === true) {
      raf = requestAnimationFrame(update);
    }

    return () => {
      cancelAnimationFrame(raf);
    }
  }, [ backgroundImage ]);

  // start recording from the webcam
  useEffect(() => {
    // We can't `new Video()` yet, so we'll resort to the vintage
    // "hidden div" hack for dynamic loading.

    // If we don't do this, the stream will not be played.
    // By the way, the play and pause controls work as usual
    // for streamed videos.
    video.current.setAttribute('autoplay', '1');
    video.current.setAttribute('playsinline', '1'); // important for iPhones

    // The video should fill out all of the canvas
    video.current.setAttribute('width', 0.5);
    video.current.setAttribute('height', 0.5);


    // The callback happens when we are starting to stream the video.
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
      console.log('video stream', stream)
      // Yay, now our webcam input is treated as a normal video and
      // we can start having fun
      video.current.srcObject = stream;
      setIsInitialised(true);
    }, function (err) {
      throw err;
    }).catch((error) => {
      console.log(error);
    });
    
  }, [ backgroundImage, texture1Canvas, texture2Canvas, texture1CanvasCtx, texture2CanvasCtx, vignetteCanvas, texture1, texture2 ]);

  return null;
};

export default WebcamTexture;