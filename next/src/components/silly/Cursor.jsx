import useWindowSize from '@/hooks/useWindowSize';
import { useRef, useState, useLayoutEffect } from 'react';

const Cursor = () => {

  const { windowWidth, windowHeight } = useWindowSize();
  const canvas = useRef(null);
  const [ characters ] = useState('(*˘︶˘*).｡.:*♡ (´｡• ω •｡`) ♡ (*˘︶˘*).｡.:*♡ (´｡• ω •｡`) ♡'.split(''));

  useLayoutEffect(() => {
    let raf;
    // dots is an array of Dot objects,
    // mouse is an object used to track the X and Y position
      // of the mouse, set with a mousemove event listener below
    const dots = [];
    const mouse = {
      x: 0,
      y: 0
    };

    const ctx = canvas.current.getContext('2d');
    canvas.current.width = windowWidth * 2;
    canvas.current.height = windowHeight * 2;


    // The Dot object used to scaffold the dots
    const Dot = function (index) {
      this.x = 0;
      this.y = 0;
      this.text = characters[ index ];
    };
    // The Dot.prototype.draw() method sets the position of 
      // the object's <div> node
    
    Dot.prototype.draw = function() {
      // this.node.style.transform = `translate(${this.x}px, ${this.y}px)`;

      if (Math.abs(this.x - mouse.x) < 5 && Math.abs(this.y - mouse.y) < 5) {
        this.opacity = 1;
      } else {
        this.opacity = 1;
      }

      ctx.font = '18pt sans-serif';
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fillText(this.text, this.x * 2, this.y * 2);
      ctx.fill();
    };
    
    // Creates the Dot objects, populates the dots array
    for (var i = 0; i < characters.length; i++) {
      const d = new Dot(i);
      dots.push(d);
    }

    // This is the screen redraw function
    const draw = () => {
      // Make sure the mouse position is set everytime
      // draw() is called.
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      let x = mouse.x,
          y = mouse.y;
      
      // This loop is where all the 90s magic happens
      dots.forEach(function (dot, index, dots) {
        const nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw();
        x += (nextDot.x - dot.x) * 0.9;
        y += (nextDot.y - dot.y) * 0.9;

      });
    }

    const handleMouseMove = (event) => {
      mouse.x = event.pageX;
      mouse.y = event.pageY;
      // trail.current.classList.remove('inactive');
    }

    window.addEventListener('mousemove', handleMouseMove);

    // animate() calls draw() then recursively calls itself
      // everytime the screen repaints via requestAnimationFrame().
    function animate() {
      draw();
      raf = requestAnimationFrame(animate);
    }

    // And get it started by calling animate().
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
      if (document.querySelector('.trail')) {
        document.querySelector('.trail').innerHTML = '';
      }
    }
  }, [ characters, windowWidth, windowHeight ]);

  return (
    <canvas
      className='w-full h-screen pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference'
      ref={ canvas }
    />
  )
};

export default Cursor;