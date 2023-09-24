import { use, useCallback, useEffect, useRef } from 'react';
import { lerp } from 'three/src/math/MathUtils';

const VignetteCanvas = ({ vignetteCanvas, vignetteCanvasCtx, targetVignetteOpacity }) => {

  const vignetteOpacity = useRef(targetVignetteOpacity);

  const drawVignette = useCallback(() => {
    vignetteCanvasCtx.current.clearRect(0, 0, 512, 512);
    const vignette = vignetteCanvasCtx.current.createRadialGradient(
      512 / 2, 512 / 2, Math.min(512, 512) / 3,
      512 / 2, 512 / 2, Math.min(512, 512) / 2,
    );

    
    vignette.addColorStop(0, `rgba(255, 255, 255, ${ 0 })`);
    vignette.addColorStop(1, `rgba(255, 255, 255, ${ vignetteOpacity.current })`);

    vignetteCanvasCtx.current.fillStyle = vignette;
    vignetteCanvasCtx.current.fillRect(0, 0, 512, 512);
  }, [ vignetteCanvas, vignetteCanvasCtx ]);
  
  // initialise the vignette canvas configuration
  useEffect(() => {
    const newVignetteCanvas = document.createElement('canvas');
    newVignetteCanvas.width = window.innerWidth;
    newVignetteCanvas.height = window.innerHeight;
    vignetteCanvas.current = newVignetteCanvas;
    vignetteCanvas.current.width = 512;
    vignetteCanvas.current.height = 512;
    vignetteCanvasCtx.current = newVignetteCanvas.getContext('2d');
    drawVignette();
  }, [ drawVignette, vignetteCanvas, vignetteCanvasCtx ]);

  useEffect(() => {
    let raf = null;
    const update = function () {
      vignetteOpacity.current = lerp(vignetteOpacity.current, targetVignetteOpacity, 0.1);
      drawVignette();
      if (Math.abs(vignetteOpacity.current - targetVignetteOpacity) > 0.001) {
        raf = requestAnimationFrame(update);
      } else {
        vignetteOpacity.current = targetVignetteOpacity;
      }
    }
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
    }
  }, [ targetVignetteOpacity ]);

  return null;
};

export default VignetteCanvas;