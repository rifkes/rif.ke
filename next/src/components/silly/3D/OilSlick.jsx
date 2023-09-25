import { shaderMaterial } from '@react-three/drei';
import { useRef, useEffect, useCallback, useState } from 'react';
import frag from './shaders/OilSlickFrag.js';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext.jsx';
import useWindowSize from '@/hooks/useWindowSize.jsx';
import TouchCanvas from './OilSlickTouchCanvas.jsx';
import OilSlickWebcamTexture from './OilSlickWebcamTexture.jsx';

const vert = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    
    gl_Position = vec4(position, 0.5);
  }
`;

const OilSlickMaterial = shaderMaterial(
  { u_time: 0 },
  // vertex shader
  /*glsl*/`${ vert }`,
  // fragment shader
  /*glsl*/`${ frag }`,
);

extend({ OilSlickMaterial });

const OilSlick = () => {

  const { webcamAllowed } = useSiteGlobals();
  const { windowWidth, windowHeight } = useWindowSize();
  const fallbackImage = '/assets/gradient-test.jpg';

  

  const config = useRef({
    dotsNumber: 6,
    dotsBaseRadius: window.innerHeight * .025,
    tailSpring: .915,
    tailGravity: window.innerHeight * .05,  
    tailGravityBonds: [window.innerHeight * .005, window.innerHeight * .01],
    tailFriction: .15,
    catchingSpeed: window.innerWidth * .0001,
  });

  const [ noiseSeed ] = useState(Math.random() * 12);
  const mesh = useRef();
  const mousemoveTimeout = useRef(null);
  const isIdle = useRef(true);
  const touchPoint = useRef(new THREE.Vector2(.5, .65));
  const targetTouchPoint = useRef(new THREE.Vector2(.5, .65));
  const touchCanvasPoint = useRef([ touchPoint.current.x * window.innerWidth, (1 - touchPoint.current.y) * window.innerHeight ]);
  const touchCanvas = useRef(null);
  const touchCanvasCtx = useRef(null);
  const textureCanvas = useRef(null);
  const textureCanvasCtx = useRef(null);
  const touchTexture = useRef(null);
  const video = useRef(document.createElement('video'));
  const texture = useRef(null);
  const touchTrail = useRef(new Array(config.current.dotsNumber));
  const material = useRef(null);

  const targetDistortionAmount = useRef(0.0);
  const currentDistortionAmount = useRef(1.0);

  // draw the image onto either canvas 1 or 2 depending on which one is active
  const handleDrawImage = useCallback((img, isVideo) => {
    const cw = textureCanvas.current.width;
    const ch = textureCanvas.current.height;

    const iw = isVideo !== true ? img.naturalWidth : img.videoWidth;
    const ih = isVideo !== true ? img.naturalHeight : img.videoHeight;

    textureCanvasCtx.current.clearRect(0, 0, cw, ch);

    // crop and center image
    const imageMoreLandscape = (iw / ih) > (cw / ch);

    const w = imageMoreLandscape === false ? cw : iw / ih * ch;
    const h = imageMoreLandscape === true ? ch : ih / iw * cw;
    const x = cw / 2 - w / 2;
    const y = ch / 2 - h / 2;

    textureCanvasCtx.current.drawImage(img, x, y, w, h);

    if (texture.current && material.current) {
      texture.current = new THREE.CanvasTexture(textureCanvas.current);
      material.current.uniforms.u_texture.value = texture.current;
      texture.current.needsUpdate = true;
      mesh.current.material.needsUpdate = true;
      material.current.uniformsNeedUpdate = true;
    }
  }, []);
  
  // initialise the image canvases
  useEffect(() => {
    const newTextureCanvas = document.createElement('canvas');
    newTextureCanvas.width = window.innerWidth;
    newTextureCanvas.height = window.innerHeight;
    textureCanvas.current = newTextureCanvas;
    textureCanvasCtx.current = newTextureCanvas.getContext('2d');
    texture.current = new THREE.CanvasTexture(textureCanvas.current);

    textureCanvasCtx.current.fillStyle = 'white';
    textureCanvasCtx.current.fillRect(0, 0, textureCanvas.current.width, textureCanvas.current.height);

    // uncomment to debug
    // touchCanvas.current.setAttribute('style', 'position: fixed; bottom: 0; left: 0; z-index: 999; width: 120px; height: auto; pointer-events: none;');
    // touchCanvas.current.setAttribute('id', 'touchCanvas');
    // document.body.appendChild(touchCanvas.current);
    // textureCanvas.current.setAttribute('style', 'position: fixed; top: 0; left: 0; z-index: 100; width: 120px; height: auto; pointer-events: none;');
    // textureCanvas.current.setAttribute('id', 'canvas1');
    // document.body.appendChild(textureCanvas.current);
  }, []);



  // initialise the uniforms
  const uniforms = useRef({
    u_touch_texture: { type: 't', value: touchTexture.current },
    u_texture: { type: 't', value: texture.current },
    u_mouse: { type: 'v2', value: new THREE.Vector2(0, 0) },
    u_alpha: { type: 'f', value: 0.2 },
    u_resolution: { type: 'v2', value: new THREE.Vector2(0, 0) },
    u_time: { type: 'f', value: 0 },
    u_ratio: { type: 'f', value: window.innerWidth / window.innerHeight },
    u_noise_seed: { type: 'f', value: noiseSeed },
    u_distortion_amount: { type: 'f', value: 1.0 },
  });

  // when the first background image changes, update the canvas
  useEffect(() => {
    const img = document.createElement('img');
    if (webcamAllowed === false) {
      img.crossOrigin = 'anonymous';
      img.addEventListener('load', () => {
        handleDrawImage(img, false);
      });
      img.src = fallbackImage;
    }
  }, [ webcamAllowed, fallbackImage, handleDrawImage ]);


  // redraw the canvases when the window resizes
  useEffect(() => {
    textureCanvasCtx.current.clearRect(0, 0, textureCanvas.current.width, textureCanvas.current.height);
    textureCanvas.current.width = 512;
    textureCanvas.current.height = windowHeight / windowWidth * 512;

    if (webcamAllowed === false) {
      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.addEventListener('load', () => {
        handleDrawImage(img, false);
      });
      img.src = fallbackImage;
    } else {
      handleDrawImage(video.current, true);
    }

  }, [ windowWidth, windowHeight, handleDrawImage, webcamAllowed, fallbackImage ]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (targetDistortionAmount.current > 0.0 && isIdle.current === true) {
      targetDistortionAmount.current -= 0.001;
    }
    if (Math.abs(currentDistortionAmount.current - targetDistortionAmount.current) > 0.001) {
      currentDistortionAmount.current = lerp(currentDistortionAmount.current, targetDistortionAmount.current, 0.05);
    } else {
      currentDistortionAmount.current = targetDistortionAmount.current;
    }
    if (material.current?.uniforms) {
      material.current.uniforms.u_time.value = time;
      material.current.uniforms.u_distortion_amount.value = currentDistortionAmount.current;
    }
  });

  const index = useRef(5);

  // dev
  useEffect(() => {

    const handleMouseMove = (e) => {
      if (targetDistortionAmount.current < 1.0) {
        targetDistortionAmount.current += 0.05;
      }
      isIdle.current = false;
      clearTimeout(mousemoveTimeout.current);
      mousemoveTimeout.current = setTimeout(() => {
        isIdle.current = true;
      }, 3000);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
    }
  }, []);

  // update the resolution and ratio uniforms when the window resizes
  useEffect(() => {
    const handleResize = () => {
      mesh.current.scale.set(window.innerWidth, window.innerHeight, 1);
      if (!material.current?.uniforms) return;
      material.current.uniforms.u_resolution.value.x = window.innerWidth;
      material.current.uniforms.u_resolution.value.y = window.innerHeight;
      material.current.uniforms.u_ratio.value = window.innerWidth / window.innerHeight;
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      <mesh
        ref={ mesh }
        position={[0, 0, -200]}
      >
        <planeGeometry args={ [ 1, 1 ] } />
        <oilSlickMaterial
          ref={ material }
          uniforms={ uniforms.current }
          attach="material"
          side={ THREE.DoubleSide }
          transparent={ true }
          depthWrite={ false }
          depthTest={ false }
        />
      </mesh>
      <TouchCanvas { ...{
        touchTrail, touchCanvasPoint, config, touchTexture, touchCanvas,
        touchCanvasCtx, material, touchPoint, targetTouchPoint, targetDistortionAmount,
        texture, currentDistortionAmount,
      } } />
      <OilSlickWebcamTexture { ...{ handleDrawImage, video } } />
    </>
  );
}

export default OilSlick;