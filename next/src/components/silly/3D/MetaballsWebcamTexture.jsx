import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect } from 'react';

const MetaballsWebcamTexture = ({ video, setActiveImage }) => {

  const { setWebcamAllowed } = useSiteGlobals();

  // start recording from the webcam
  useEffect(() => {
      // We can't `new Video()` yet, so we'll resort to the vintage
      // "hidden div" hack for dynamic loading.

    // If we don't do this, the stream will not be played.
    // By the way, the play and pause controls work as usual
    // for streamed videos.
    video.current.setAttribute('autoplay', true)
    video.current.setAttribute('playsinline', true); // important for iPhones
    video.current.setAttribute('muted', '1');

    // video.current.setAttribute('style', 'width: 120px; height: auto; position: fixed; top: 0; left: 0; z-index: 999;')
    // document.body.appendChild(video.current);

    // As soon as we can draw a new frame on the canvas, we call the `draw` function
    // we passed as a parameter.

    // The callback happens when we are starting to stream the video.current.
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        frameRate: { ideal: 10, max: 12 },
        width: { max: 400 },
        height: { max: 400 / 16 * 9 }
    }, audio: false }).then(function (stream) {
      // Yay, now our webcam input is treated as a normal video and
      // we can start having fun
      video.current.srcObject = stream;
      setWebcamAllowed(true);
    }, function (err) {
      throw err;
    }).catch((error) => {
      setWebcamAllowed(false);
      setActiveImage('image');
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

    const handlePlay = () => {
      setActiveImage('webcam');
    }

    video.current.addEventListener('play', handlePlay);

    return () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    }
  }, [ video, setActiveImage ]);
  
  return null;
};

export default MetaballsWebcamTexture;