import useWindowSize from '@/hooks/useWindowSize';
import { useRef, useLayoutEffect, useEffect, useState } from 'react';

const DistortedTextCanvas = ({ handleDrawImage, textureCanvas, textureCanvasCtx, texture, material, }) => {

  const { windowWidth, windowHeight } = useWindowSize();
  const canvas = useRef(null);

  console.log('canvas', canvas);

  useLayoutEffect(() => {
    let raf;
    const mouse = {
      x: 0,
      y: 0,
    };

    const handleMouseMove = (event) => {
      mouse.x = event.pageX;
      mouse.y = event.pageY;
    };

    canvas.current = document.createElement('canvas');
    canvas.current.style.position = 'fixed';
    canvas.current.className = 'tfhghggdsfhj';
    canvas.current.style.zIndex = '9999';
    canvas.current.style.top = '0';
    canvas.current.style.left = '0';
    canvas.current.style.pointerEvents = 'none';
    canvas.current.style.width = '100vw';
    canvas.current.style.height = '100vh';
    const ctx = canvas.current.getContext('2d');

    if (windowWidth > 2 && windowHeight > 2) {
      // document.body.appendChild(canvas.current);
      canvas.current.width = windowWidth * 2;
      canvas.current.height = windowHeight * 2;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
    
      // ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      let grd = ctx.createRadialGradient(windowWidth, windowHeight, 0, windowWidth, windowHeight, windowWidth);
      grd.addColorStop(0, 'rgba(0, 0, 0, 1)');
      grd.addColorStop(1, 'rgba(255, 0, 255, 1)');
      ctx.fillStyle = grd;
      // ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = '18pt sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText('INFO', 11, 19);
      ctx.fill();

      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.font = '18pt sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText('♡', (windowWidth * 2) - 12, 19);
      ctx.fill();

      ctx.textAlign = 'center';
      // ctx.textBaseline = 'top';
      ctx.font = '18pt sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText('RIFKE', windowWidth, windowHeight - 12);
      ctx.fill();

      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.font = '18pt sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText('ASK ME ANYTHING', 11, windowHeight * 2 - 19);
      ctx.fill();

      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.font = '18pt sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText('FOLLOW', (windowWidth * 2) - 12, windowHeight * 2 - 19);
      ctx.fill();


      ctx.globalCompositeOperation = 'source-over';
      // ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      // ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

      const colors = [ '255, 0, 0', '255, 255, 0', '0, 255, 0', '0, 255, 255', '0, 0, 255' ];
      let radius, x, y;

      for (let i = 0; i < 5; i++) {
        const color = colors[ Math.floor(Math.random() * colors.length) ];
        x = Math.random() * canvas.current.width;
        y = Math.random() * canvas.current.height;
        radius = Math.random() * canvas.current.width * 0.25 + canvas.current.width * 0.25;
        grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grd.addColorStop(0, `rgba(${ color }, 1)`);
        grd.addColorStop(1, `rgba(${ color }, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      grd = ctx.createRadialGradient(canvas.current.width * 0.5, canvas.current.height * 0.5, 0, canvas.current.width * 0.5, canvas.current.height * 0.5, canvas.current.width * 0.25);
      grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grd.addColorStop(1, 'rgba(255, 255, 255, 1)');
      ctx.fillStyle = grd;
      ctx.beginPath();

    }

    const dataUrl = canvas.current.toDataURL('image/png');
    const img = document.createElement('img');

    const handleImageLoad = () => {
      handleDrawImage(img);
    }

    img.addEventListener('load', handleImageLoad);
    img.src = dataUrl;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
      img.removeEventListener('load', handleImageLoad);
    }
  }, [ windowWidth, windowHeight, handleDrawImage ]);

  return null;
};

export default DistortedTextCanvas;