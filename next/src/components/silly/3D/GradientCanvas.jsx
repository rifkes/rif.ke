import useWindowSize from '@/hooks/useWindowSize';
import { useRef, useLayoutEffect, useEffect, useState } from 'react';

const DistortedTextCanvas = () => {

  const { windowWidth, windowHeight } = useWindowSize();
  const canvas = useRef(null);
  const dotsLength = 1;

  const [ startingPoint, setStartingPoint ] = useState({
    x: -1,
    y: -1,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (startingPoint.x === -1 && startingPoint.y === -1) {
        setStartingPoint({
          x: event.pageX,
          y: event.pageY,
        });
      }
    };

    if (startingPoint.x === -1 && startingPoint.y === -1) {
      window.addEventListener('mousemove', handleMouseMove, 'once');
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove, 'once');
    }
  }, [ setStartingPoint, startingPoint ]);

  useLayoutEffect(() => {
    let raf;
    const mouse = {
      x: startingPoint.x,
      y: startingPoint.y,
    };

    const handleMouseMove = (event) => {
      mouse.x = event.pageX;
      mouse.y = event.pageY;
    };

    canvas.current = document.createElement('canvas');
    canvas.current.style.position = 'fixed';
    canvas.current.style.top = '0';
    canvas.current.style.left = '0';
    canvas.current.style.pointerEvents = 'none';
    canvas.current.style.width = '100vw';
    canvas.current.style.height = '100vh';
    const ctx = canvas.current.getContext('2d');

    if (startingPoint.x === -1 && startingPoint.y === -1) {
      canvas.current.width = windowWidth * 2;
      canvas.current.height = windowHeight * 2;

      ctx.globalCompositeOperation = 'source-over';
      // ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      // ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

      const colors = [ '255, 0, 0', '255, 255, 0', '0, 255, 0', '0, 255, 255', '0, 0, 255' ];
      let grd, radius, x, y;

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
    
    // dots is an array of Dot objects,
    // mouse is an object used to track the X and Y position
    // of the mouse, set with a mousemove event listener below

    if (startingPoint.x > -1 && startingPoint.y > -1) {
      const dots = [];

      // The Dot object used to scaffold the dots
      const Dot = function (index) {
        this.x = 0;
        this.y = 0;
      };
      // The Dot.prototype.draw() method sets the position of 
      // the object's <div> node
    
      Dot.prototype.draw = function () {
        // this.node.style.transform = `translate(${this.x}px, ${this.y}px)`;

        if (Math.abs(this.x - mouse.x) < 5 && Math.abs(this.y - mouse.y) < 5) {
          this.opacity = 1;
        } else {
          this.opacity = 1;
        }

        ctx.globalCompositeOperation = 'destination-out';
        const gradient = ctx.createRadialGradient(this.x * 2, this.y * 2, 0, this.x * 2, this.y * 2, windowWidth * 0.25);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ 0.1 })`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x * 2, this.y * 2, windowWidth * 0.25, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
      };
    
      // Creates the Dot objects, populates the dots array
      for (var i = 0; i < dotsLength; i++) {
        const d = new Dot(i);
        dots.push(d);
      }

      // This is the screen redraw function
      const draw = () => {
        // Make sure the mouse position is set everytime
        // draw() is called.
        let x = mouse.x,
          y = mouse.y;
      
        // This loop is where all the 90s magic happens
        dots.forEach(function (dot, index, dots) {
          const nextDot = dots[ index + 1 ] || dots[ 0 ];
          dot.x = x;
          dot.y = y;
          dot.draw();
          x += (nextDot.x - dot.x) * 0.9;
          y += (nextDot.y - dot.y) * 0.9;

        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // animate() calls draw() then recursively calls itself
      // everytime the screen repaints via requestAnimationFrame().
      function animate() {
        draw();
        raf = requestAnimationFrame(animate);
      }

      // And get it started by calling animate().
      animate();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [ dotsLength, windowWidth, windowHeight, startingPoint ]);

  return null;
};

export default DistortedTextCanvas;