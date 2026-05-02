import { useEffect, useRef } from 'react';
import Player from './Grob-Player';

const lerp = (start, end, amount) => {
  return (1 - amount) * start + amount * end;
};

const Grob = () => {

  const canvasRef = useRef(null);
  const idleTimer = useRef(null);
  const targetOpacity = useRef(0);
  const currentOpacity = useRef(0);

  useEffect(() => {
    let raf;
    let player;
    let canvas;
    let ctx;
    const imageRight = new Image();
    let prevX = 0;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        targetOpacity.current = 1;
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
          targetOpacity.current = 0;
        }, 4000);
      }
      switch (e.key) {
        case 'ArrowUp':
          player.arrowPressed = 'up';
          player.upwards += 100;
          break;
        case 'ArrowDown':
          player.arrowPressed = 'down';
          break;
        case 'ArrowLeft':
          player.arrowPressed = 'left';
          player.direction = 'left';
          break;
        case 'ArrowRight':
          player.arrowPressed = 'right';
          player.direction = 'right';
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      if (
        (e.key === 'ArrowUp' && player.arrowPressed === 'up') ||
        (e.key === 'ArrowDown' && player.arrowPressed === 'down') ||
        (e.key === 'ArrowLeft' && player.arrowPressed === 'left') ||
        (e.key === 'ArrowRight' && player.arrowPressed === 'right')
      ) {
        player.arrowPressed = 'none';
      }
    };

    const touchStart = (e) => {
      const touch = e.touches[ 0 ];
      const touchX = touch.clientX;
      if (touchX < window.innerWidth / 2) {
        player.arrowPressed = 'left';
        player.direction = 'left';
      } else {
        player.arrowPressed = 'right';
        player.direction = 'right';
      }
      prevX = touchX;
    };

    const touchMove = (e) => {
      targetOpacity.current = 1;
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        targetOpacity.current = 0;
      }, 4000);
      const touch = e.touches[ 0 ];
      const touchX = touch.clientX;
      if (touchX < prevX - 10) {
        player.arrowPressed = 'left';
        player.direction = 'left';
        prevX = touchX;
      } else if (touchX > prevX ) {
        player.arrowPressed = 'right';
        player.direction = 'right';
        prevX = touchX;
      }
      prevX = touchX;
    };

    const touchEnd = (e) => {
      player.arrowPressed = 'none';
      prevX = window.innerWidth / 2;
    };

    const handleMouseMove = (e) => {
      targetOpacity.current = 1;
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        targetOpacity.current = 0;
      }, 4000);

      const mouseX = e.clientX;
      if (mouseX < prevX) {
        player.arrowPressed = 'left';
        player.direction = 'left';
      } else if (mouseX > prevX) {
        if (player?.arrowPressed) {
          player.arrowPressed = 'right';
          player.direction = 'right';
        }
      }
      prevX = mouseX;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('touchstart', touchStart);
    window.addEventListener('touchmove', touchMove);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseMove);
    window.addEventListener('touchend', touchEnd);

    const drawGrob = () => {
      // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight

      if (player) {
        player.draw('hi');
      }
    };

    const draw = () => {
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrob();
      currentOpacity.current = lerp(currentOpacity.current, targetOpacity.current, 0.1);
      ctx.fillStyle = `rgba(255, 255, 255, ${ 1 - currentOpacity.current })`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      raf = requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      canvas.width = Math.max(768, window.innerWidth);
      canvas.height = canvas.width / window.innerWidth * window.innerHeight;
      cancelAnimationFrame(raf);
      draw();
    };

    window.addEventListener('resize', resizeCanvas);

    const setupCanvas = () => {
      canvas = canvasRef.current;
      if (canvas) {
        canvas.width = Math.max(768, window.innerWidth);
        canvas.height = canvas.width / window.innerWidth * window.innerHeight;
        ctx = canvas.getContext('2d');
        imageRight.onload = () => {
          const imageLeft = new Image();
          const width = imageRight.naturalWidth;
          const height = imageRight.naturalHeight;
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          tempCanvas.width = width;
          tempCanvas.height = height;
          tempCtx.scale(-1, 1);
          tempCtx.drawImage(imageRight, -width, 0);
          imageLeft.src = tempCanvas.toDataURL();
          raf = requestAnimationFrame(draw);

          player = new Player({ ctx, imageRight, imageLeft, width, height });
        };
        imageRight.src = '/sprites/grob/walk.png';
      } else {
        raf = requestAnimationFrame(setupCanvas);
      }
    };

    setupCanvas();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={ canvasRef }
        className='w-screen h-screen'
        style={ {
          imageRendering: 'pixelated',
        } }
      />
    </>
  );
};

export default Grob;
export { lerp };