import useWindowSize from '@/hooks/useWindowSize';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useRef, useLayoutEffect, useEffect, useState } from 'react';

const DistortedTextCanvas = ({ handleDrawImage }) => {

  const { windowWidth, windowHeight } = useWindowSize();
  const canvas = useRef(null);
  const { titleText, activeItem, infoIsActive, itemInfoIsActive } = useSiteGlobals();

  const [ fontIsLoaded, setFontIsLoaded ] = useState(false);
  const font = useRef(null);
  
  useEffect(() => {
    font.current = new FontFace('myFont', 'url(/fonts/HelveticaNeue-Roman.ttf)');

    font.current.load().then(function(font){
      // with canvas, if this is ommited won't work
      document.fonts.add(font);
      setFontIsLoaded(true);
    });

  }, [ fontIsLoaded ]);

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

    if (windowWidth > 2 && windowHeight > 2 && fontIsLoaded === true) {
      // document.body.appendChild(canvas.current);
      canvas.current.width = windowWidth * 2;
      canvas.current.height = windowHeight * 2;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = '18pt myFont';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      if (infoIsActive === true) {
        ctx.fillText('CLOSE', 11, 19);
      } else {
        ctx.fillText('INFO', 11, 19);
      }
      ctx.fill();

      if (activeItem?.title) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        if (itemInfoIsActive === true) {
          ctx.fillText('CLOSE', windowWidth, 19);
        } else {
          ctx.fillText('?', windowWidth, 19);
        }
        ctx.fill();
      }

      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText('♡', (windowWidth * 2) - 12, 19);
      ctx.fill();

      if (infoIsActive === false && itemInfoIsActive === false) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(titleText.toUpperCase(), windowWidth, windowHeight - 12);
        ctx.fill();
      }

      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText('ASK ME ANYTHING', 11, windowHeight * 2 - 19);
      ctx.fill();

      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('FOLLOW', (windowWidth * 2) - 12, windowHeight * 2 - 19);
      ctx.fill();
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
  }, [ windowWidth, windowHeight, handleDrawImage, titleText, activeItem, infoIsActive, itemInfoIsActive, fontIsLoaded ]);

  return null;
};

export default DistortedTextCanvas;