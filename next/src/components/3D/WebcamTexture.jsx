import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useRef, useState } from 'react';

const WebcamTexture = ({ backgroundImageTexture1, backgroundImageTexture2, activeTextureIndex, targetFadeAmount,
  texture1, texture2, texture1Canvas, texture2Canvas, texture1CanvasCtx, texture2CanvasCtx, vignetteCanvas, handleDrawImage, video
}) => {

  const [ videoIsReady, setVideoIsReady ] = useState(false);

  // update the webcam texture if either of the background images is set to webcam
  useEffect(() => {
    let raf;
    let last = Date.now();
    const loop = () => {
      // For some effects, you might want to know how much time is passed
      // since the last frame; that's why we pass along a Delta time `dt`
      // variable (expressed in milliseconds)
      const dt = Date.now() - last;
      // self.callback(self.video, dt)
      last = Date.now();

      if (backgroundImageTexture2 === 'webcam') {
        handleDrawImage(video.current, texture2Canvas.current, texture2CanvasCtx.current, 2, true);
      }
      if (backgroundImageTexture1 === 'webcam') {
        handleDrawImage(video.current, texture1Canvas.current, texture1CanvasCtx.current, 1, true);
      }
      
      if (backgroundImageTexture2 === 'webcam' || backgroundImageTexture1 === 'webcam') {
        raf = requestAnimationFrame(loop);
      }
    };
    
    if (videoIsReady) {
      if (backgroundImageTexture2 === 'webcam' || backgroundImageTexture1 === 'webcam') {
        raf = requestAnimationFrame(loop);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
    }
  }, [ texture1, texture2, texture1Canvas, texture2Canvas, texture1CanvasCtx, texture2CanvasCtx, vignetteCanvas, handleDrawImage, video, backgroundImageTexture1, backgroundImageTexture2 ]);
  

  // start recording from the webcam
  useEffect(() => {
      // We can't `new Video()` yet, so we'll resort to the vintage
      // "hidden div" hack for dynamic loading.
    const streamContainer = document.createElement('div');
    streamContainer.classList.add('stream__container');
    video.current.classList.add('stream');

    // If we don't do this, the stream will not be played.
    // By the way, the play and pause controls work as usual
    // for streamed videos.
    video.current.setAttribute('autoplay', '1')
    video.current.setAttribute('playsinline', '1'); // important for iPhones
    video.current.setAttribute('muted', '1');

    // The video should fill out all of the canvas
    video.current.setAttribute('width', 0.5)
    video.current.setAttribute('height', 0.5)

    // streamContainer.appendChild(video)
    // document.body.appendChild(streamContainer)

    // As soon as we can draw a new frame on the canvas, we call the `draw` function
    // we passed as a parameter.

    // The callback happens when we are starting to stream the video.current.
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
      // Yay, now our webcam input is treated as a normal video and
      // we can start having fun
      video.current.srcObject = stream;
      setVideoIsReady(true);
    }, function (err) {
      throw err;
    }).catch((error) => {
      console.log(error);
    });

    const handleFirstInteraction = () => {
      video.current.play()
        .then(() => {
          console.log('play success');
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
  }, [ video, texture1, texture2, texture1Canvas, texture2Canvas, texture1CanvasCtx, texture2CanvasCtx, vignetteCanvas, handleDrawImage ]);
  
  return null;
};

export default WebcamTexture;