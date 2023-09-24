import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useRef, useState } from 'react';

const WebcamTexture = ({ texture1, texture2, texture1Canvas, texture2Canvas, texture1CanvasCtx, texture2CanvasCtx, vignetteCanvas, handleDrawImage, video }) => {



  

  // start recording from the webcam
  useEffect(() => {
    let raf;
      // We can't `new Video()` yet, so we'll resort to the vintage
      // "hidden div" hack for dynamic loading.
      var streamContainer = document.createElement('div');
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
				const update = function() {
					var last = Date.now()
					const loop = () => {
						// For some effects, you might want to know how much time is passed
						// since the last frame; that's why we pass along a Delta time `dt`
						// variable (expressed in milliseconds)
						var dt = Date.now() - last
						// self.callback(self.video, dt)
            last = Date.now();
            texture1CanvasCtx.current.drawImage(video.current, 0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
            texture2CanvasCtx.current.drawImage(video.current, 0, 0, texture1Canvas.current.width, texture1Canvas.current.height);

            texture1CanvasCtx.current.drawImage(vignetteCanvas.current, 0, 0, vignetteCanvas.current.width, vignetteCanvas.current.height, 0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
            texture2CanvasCtx.current.drawImage(vignetteCanvas.current, 0, 0, vignetteCanvas.current.width, vignetteCanvas.current.height, 0, 0, texture2Canvas.current.width, texture2Canvas.current.height);
            texture1.current.needsUpdate = true;
            texture2.current.needsUpdate = true;
						raf = requestAnimationFrame(loop)
					}
					raf = requestAnimationFrame(loop)
				}

				// The callback happens when we are starting to stream the video.current.
				navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function(stream) {
					// Yay, now our webcam input is treated as a normal video and
					// we can start having fun
          video.current.srcObject = stream;
          update();
				}, function(err) {
					throw err
				}).catch( (error) => {
					console.log(error);
				})

    return () => {
      cancelAnimationFrame(raf);
    }
  }, [ video, texture1, texture2, texture1Canvas, texture2Canvas, texture1CanvasCtx, texture2CanvasCtx, vignetteCanvas, handleDrawImage ]);
  
  return null;
};

export default WebcamTexture;