import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';

const TouchCanvas = ({
  touchTrail, touchCanvasPoint, config, touchTexture, touchCanvas, touchCanvasCtx,
  material, touchPoint, targetTouchPoint, targetDistortionAmount, texture1, texture2,
 }) => {

  const color = '255, 255, 255';

  const isMoving = useRef(false);
  const movingTimer = useRef(null);

  // initialise the touchcanvas configuration
  useEffect(() => {
    const newTouchCanvas = document.createElement('canvas');
    newTouchCanvas.width = window.innerWidth;
    newTouchCanvas.height = window.innerHeight;
    touchCanvas.current = newTouchCanvas;
    touchCanvasCtx.current = newTouchCanvas.getContext('2d');
    touchTexture.current = new THREE.CanvasTexture(touchCanvas.current);

    touchCanvasCtx.current.fillStyle = 'black';
    touchCanvasCtx.current.fillRect(0, 0, touchCanvas.current.width, touchCanvas.current.height);

    for (let i = 0; i < config.current.dotsNumber; i++) {
      touchTrail.current[ i ] = {
        x: touchCanvasPoint.current[ 0 ],
        y: touchCanvasPoint.current[ 1 ],
        vx: 0,
        vy: 0,
        intensity: i ? .9 * (config.current.dotsNumber - i) / config.current.dotsNumber : .9,
        r: config.current.dotsBaseRadius * (1 + Math.pow(i / config.current.dotsNumber, .9))
      };
    }



    let movingTimeout = () => {
      isMoving.current = false;
    };
    movingTimer.current = setTimeout(movingTimeout, 300);

    window.addEventListener('mousemove', (e) => {
      updateMousePosition(e.clientX, e.clientY);
    });
    window.addEventListener('touchmove', (e) => {
      updateMousePosition(e.targetTouches[ 0 ].pageX, e.targetTouches[ 0 ].pageY);
    });

    const updateMousePosition = (eX, eY) => {
      if (isMoving.current === false) {
        isMoving.current = true;
      }
      clearTimeout(movingTimer.current);
      movingTimer.current = setTimeout(movingTimeout, 300);

      targetTouchPoint.current.x = eX / window.innerWidth;
      targetTouchPoint.current.y = 1.1 - Math.max(eY / window.innerHeight, .2);
    }

  }, [ touchCanvas, touchCanvasCtx, touchCanvasPoint, touchTexture, touchTrail, config ]);





  // update touchCanvas
  const updateTrail = useCallback(() => {
    if (!touchCanvasCtx.current || !touchTexture.current) return;
    if (targetDistortionAmount
      .current === 0) {
      touchCanvasCtx.current.fillStyle = 'rgba(0, 0, 0, .1)';
    } else {
      touchCanvasCtx.current.fillStyle = 'rgba(0, 0, 0, .01)';
    }
    touchCanvasCtx.current.fillRect(0, 0, touchCanvas.current.width, touchCanvas.current.height);

    touchTrail.current.forEach((p, pIdx) => {
      if (pIdx === 0) {
        p.x = touchCanvasPoint.current[ 0 ];
        p.y = touchCanvasPoint.current[ 1 ];
      } else {
        p.vx += (touchTrail.current[ pIdx - 1 ].x - p.x) * config.current.tailSpring;
        p.vx *= config.current.tailFriction;

        p.vy += (touchTrail.current[ pIdx - 1 ].y - p.y) * config.current.tailSpring;
        p.vy += config.current.tailGravity;
        p.vy *= config.current.tailFriction;

        p.x += p.vx;
        p.y += p.vy;
      }

      const grd = touchCanvasCtx.current.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grd.addColorStop(0, `rgba(${ color },${ 0.1 })`);
      grd.addColorStop(1, `rgba(${ color }, 0)`);

      touchCanvasCtx.current.beginPath();
      touchCanvasCtx.current.fillStyle = grd;
      touchCanvasCtx.current.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      touchCanvasCtx.current.fill();
    });

    touchTexture.current.needsUpdate = true;
    texture1.current.needsUpdate = true;
    texture2.current.needsUpdate = true;
  }, [ color ]);

  useFrame(({ clock }) => {
    touchPoint.current.x += (targetTouchPoint.current.x - touchPoint.current.x) * config.current.catchingSpeed;
    touchPoint.current.y += (targetTouchPoint.current.y - touchPoint.current.y) * config.current.catchingSpeed;
    touchCanvasPoint.current = [ touchPoint.current.x * window.innerWidth, (1 - touchPoint.current.y) * window.innerHeight ];

    const time = clock.getElapsedTime();

    if (isMoving.current) {
      config.current.tailGravity -= .1;
      config.current.tailGravity = Math.max(config.current.tailGravity, config.current.tailGravityBonds[0]);
    } else {
      config.current.tailGravity += .1;
      config.current.tailGravity = Math.min(config.current.tailGravity, config.current.tailGravityBonds[1]);
    }
    config.current.tailGravity += .12 * Math.sin(3 * time);

    updateTrail();
    if (material.current?.uniforms) {
      material.current.uniforms.u_touch_texture.value = touchTexture.current;
      material.current.uniforms.u_mouse.value.x = touchPoint.current.x;
      material.current.uniforms.u_mouse.value.y = touchPoint.current.y;
    }
  });

  return null;
};

export default TouchCanvas;