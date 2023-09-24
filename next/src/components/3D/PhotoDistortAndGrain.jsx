import { shaderMaterial } from '@react-three/drei';
import { useRef, useEffect, useCallback, useState } from 'react';
import frag from './shaders/photoDistortAndGrainFrag.js';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext.jsx';
import useWindowSize from '@/hooks/useWindowSize.jsx';
import TouchCanvas from './TouchCanvas.jsx';
import WebcamTexture from './WebcamTexture.jsx';

const vert = `
  varying vec2 vUv;
  uniform sampler2D u_texture_2;
  varying vec3 viewZ;

  void main() {
    vUv = uv;
    viewZ = -(modelViewMatrix * vec4(position.xyz, 1.)).xyz;
    
    gl_Position = vec4(position, 0.5);
  }
`;

const DistortionMaterial = shaderMaterial(
  { u_time: 0 },
  // vertex shader
  /*glsl*/`${ vert }`,
  // fragment shader
  /*glsl*/`${ frag }`,
);

extend({ DistortionMaterial });

const PhotoDistortAndGrain = ({ stage }) => {

  const { backgroundImage, setBackgroundImage } = useSiteGlobals();
  const { windowWidth, windowHeight } = useWindowSize();

  // const [ backgroundImage ] = useState('/assets/stunning-vista.png');

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
  const touchPoint = useRef(new THREE.Vector2(.5, .65));
  const targetTouchPoint = useRef(new THREE.Vector2(.5, .65));
  const touchCanvasPoint = useRef([ touchPoint.current.x * window.innerWidth, (1 - touchPoint.current.y) * window.innerHeight ]);
  const touchCanvas = useRef(null);
  const touchCanvasCtx = useRef(null);
  const texture1Canvas = useRef(null);
  const texture1CanvasCtx = useRef(null);
  const texture2Canvas = useRef(null);
  const texture2CanvasCtx = useRef(null);
  const touchTexture = useRef(null);
  const video = useRef(document.createElement('video'));
  const texture1 = useRef(null);
  const texture2 = useRef(null);
  const touchTrail = useRef(new Array(config.current.dotsNumber));
  const material = useRef(null);
  const backgroundImageHistory = useRef([ backgroundImage, backgroundImage ]);
  const [ backgroundImageTexture1, setBackgroundImageTexture1 ] = useState(backgroundImage);
  const [ backgroundImageTexture2, setBackgroundImageTexture2 ] = useState(backgroundImage);
  const currentStage = useRef(stage);
  
  const activeTextureIndex = useRef(1);
  const currentFadeAmount = useRef(1);
  const targetFadeAmount = useRef(1);

  const targetDistortionAmount = useRef(0.0);
  const currentDistortionAmount = useRef(1.0);
  const distortionAmountTimeout = useRef(null);
  
  useEffect(() => {
    currentStage.current = stage;
  }, [ stage ]);

  // draw the image onto either canvas 1 or 2 depending on which one is active
  const handleDrawImage = useCallback((img, visualCanvas, visualCtx, textureToChange, isVideo) => {
    const cw = visualCanvas.width;
    const ch = visualCanvas.height;

    const iw = isVideo !== true ? img.naturalWidth : img.videoWidth;
    const ih = isVideo !== true ? img.naturalHeight : img.videoHeight;

    visualCtx.clearRect(0, 0, cw, ch);

    // crop and center image
    const imageMoreLandscape = (iw / ih) > (cw / ch);

    const w = imageMoreLandscape === false ? cw : iw / ih * ch;
    const h = imageMoreLandscape === true ? ch : ih / iw * cw;
    const x = cw / 2 - w / 2;
    const y = ch / 2 - h / 2;

    visualCtx.drawImage(img, x, y, w, h);

    if (textureToChange === 2) {
      if (texture2.current) {
        texture2.current = new THREE.CanvasTexture(texture2Canvas.current);
        material.current.uniforms.u_texture_2.value = texture2.current;
        texture2.current.needsUpdate = true;
        mesh.current.material.needsUpdate = true;
        material.current.uniformsNeedUpdate = true;
      }
    } else {      
      if (texture1.current) {
        texture1.current = new THREE.CanvasTexture(texture1Canvas.current);
        material.current.uniforms.u_texture_1.value = texture1.current;
        texture1.current.needsUpdate = true;
        mesh.current.material.needsUpdate = true;
        material.current.uniformsNeedUpdate = true;
      }
    }
  }, []);
  
  // initialise the image canvases
  useEffect(() => {
    const newTexture1Canvas = document.createElement('canvas');
    newTexture1Canvas.width = window.innerWidth;
    newTexture1Canvas.height = window.innerHeight;
    texture1Canvas.current = newTexture1Canvas;
    texture1CanvasCtx.current = newTexture1Canvas.getContext('2d');
    texture1.current = new THREE.CanvasTexture(texture1Canvas.current);

    const newTexture2Canvas = document.createElement('canvas');
    newTexture2Canvas.width = window.innerWidth;
    newTexture2Canvas.height = window.innerHeight;
    texture2Canvas.current = newTexture2Canvas;
    texture2CanvasCtx.current = newTexture2Canvas.getContext('2d');
    texture2.current = new THREE.CanvasTexture(texture2Canvas.current);

    texture1CanvasCtx.current.fillStyle = 'white';
    texture1CanvasCtx.current.fillRect(0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
    texture2CanvasCtx.current.fillStyle = 'white';
    texture2CanvasCtx.current.fillRect(0, 0, texture2Canvas.current.width, texture2Canvas.current.height);

    // uncomment to debug
    // touchCanvas.current.setAttribute('style', 'position: fixed; bottom: 0; left: 0; z-index: 100; width: 120px; height: auto; pointer-events: none;');
    // touchCanvas.current.setAttribute('id', 'touchCanvas');
    // texture1Canvas.current.setAttribute('style', 'position: fixed; top: 0; left: 0; z-index: 100; width: 120px; height: auto; pointer-events: none;');
    // texture1Canvas.current.setAttribute('id', 'canvas1');
    // texture2Canvas.current.setAttribute('style', 'position: fixed; top: 0; right: 0; z-index: 100; width: 120px; height: auto; pointer-events: none;');
    // texture2Canvas.current.setAttribute('id', 'canvas2');
    // document.body.appendChild(texture1Canvas.current);
    // document.body.appendChild(texture2Canvas.current);
    // document.body.appendChild(touchCanvas.current);
  }, []);



  // initialise the uniforms
  const uniforms = useRef({
    u_touch_texture: { type: 't', value: touchTexture.current },
    u_texture_1: { type: 't', value: texture1.current },
    u_texture_2: { type: 't', value: texture2.current },
    u_mouse: { type: 'v2', value: new THREE.Vector2(0, 0) },
    u_alpha: { type: 'f', value: 0.8 },
    u_resolution: { type: 'v2', value: new THREE.Vector2(0, 0) },
    u_time: { type: 'f', value: 0 },
    u_transition_amount: { type: 'f', value: 0 },
    u_ratio: { type: 'f', value: window.innerWidth / window.innerHeight },
    u_noise_seed: { type: 'f', value: noiseSeed },
    u_distortion_amount: { type: 'f', value: 1.0 },
  });

  // assign each background image in the array so it reflects what’s on canvas 1 and 2
  useEffect(() => {
    targetDistortionAmount.current = 0.0;
    if (activeTextureIndex.current === 0) {
      backgroundImageHistory.current[1] = backgroundImage;
      setBackgroundImageTexture2(backgroundImage);
    } else {
      backgroundImageHistory.current[0] = backgroundImage;
      setBackgroundImageTexture1(backgroundImage);
    }
  }, [ backgroundImage ]);

  // when the first background image changes, update the canvas
  useEffect(() => {
    const img = document.createElement('img');

    if (backgroundImageTexture1) {
      const visualCanvas = texture1Canvas.current;
      const visualCtx = texture1CanvasCtx.current;
      if (backgroundImageTexture1 !== 'webcam') {
        img.crossOrigin = 'anonymous';
        img.addEventListener('load', () => {
          activeTextureIndex.current = 0;
          handleDrawImage(img, visualCanvas, visualCtx, 1);
          targetFadeAmount.current = 0;
        });
        img.src = backgroundImageTexture1;
      } else {
        activeTextureIndex.current = 0;
        targetFadeAmount.current = 0;
      }
    }
  }, [ backgroundImageTexture1, handleDrawImage ]);


  // when the second background image changes, update the canvas
  useEffect(() => {
    const img = document.createElement('img');
    if (backgroundImageTexture2) {
      const visualCanvas = texture2Canvas.current;
      const visualCtx = texture2CanvasCtx.current;
      if (backgroundImageTexture2 !== 'webcam') {
        img.crossOrigin = 'anonymous';
        img.addEventListener('load', () => {
          activeTextureIndex.current = 1;
          handleDrawImage(img, visualCanvas, visualCtx, 2);
          targetFadeAmount.current = 1;
        });
        img.src = backgroundImageTexture2;
      } else {
        activeTextureIndex.current = 1;
        targetFadeAmount.current = 1;
      }
    }

  }, [ backgroundImageTexture2, handleDrawImage ]);

  // redraw the canvases when the window resizes
  useEffect(() => {
    texture1CanvasCtx.current.clearRect(0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
    texture1CanvasCtx.current.clearRect(0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
    texture1Canvas.current.width = 1024;
    texture1Canvas.current.height = windowHeight / windowWidth * 1024;
    texture2Canvas.current.width = 1024;
    texture2Canvas.current.height = windowHeight / windowWidth * 1024;

    if (backgroundImageHistory.current[1] && backgroundImageHistory.current[1] !== 'webcam') {
      const img = document.createElement('img');
      const visualCanvas = texture2Canvas.current;
      const visualCtx = texture2CanvasCtx.current;
      
      img.crossOrigin = 'anonymous';
      img.addEventListener('load', () => {
        handleDrawImage(img, visualCanvas, visualCtx, 1);
      });
      img.src = backgroundImageHistory.current[1];
    } else if (backgroundImageHistory.current[ 1 ] && backgroundImageHistory.current[ 1 ] === 'webcam') {
      handleDrawImage(video.current, texture2Canvas.current, texture2CanvasCtx.current, 1, true);
    }

    if (backgroundImageHistory.current[0] && backgroundImageHistory.current[0] !== 'webcam') {
      const img = document.createElement('img');
      const visualCanvas = texture1Canvas.current;
      const visualCtx = texture1CanvasCtx.current;
      
      img.crossOrigin = 'anonymous';
      img.addEventListener('load', () => {
        handleDrawImage(img, visualCanvas, visualCtx, 2);
      });
      img.src = backgroundImageHistory.current[0];
    } else if (backgroundImageHistory.current[ 1 ] && backgroundImageHistory.current[ 1 ] === 'webcam') {
      handleDrawImage(video.current, texture2Canvas.current, texture2CanvasCtx.current, 1, true);
    }

  }, [ windowWidth, windowHeight ]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (targetDistortionAmount.current > 0.0) {
      targetDistortionAmount.current -= 0.001;
    }
    currentFadeAmount.current = lerp(currentFadeAmount.current, targetFadeAmount.current, 0.05);
    if (Math.abs(currentDistortionAmount.current - targetDistortionAmount.current) > 0.001) {
      currentDistortionAmount.current = lerp(currentDistortionAmount.current, targetDistortionAmount.current, 0.05);
    } else {
      currentDistortionAmount.current = targetDistortionAmount.current;
    }
    if (material.current?.uniforms) {
      material.current.uniforms.u_transition_amount.value = currentFadeAmount.current;
      material.current.uniforms.u_time.value = time;
      material.current.uniforms.u_distortion_amount.value = currentDistortionAmount.current;
    }
  });

  const index = useRef(5);

  // dev
  useEffect(() => {

    let amount = 1.0;

    const handleMouseMove = (e) => {
      if (targetDistortionAmount.current < 1.0) {
        targetDistortionAmount.current += 0.005;
      }
    }

    const handleClick = () => {
      index.current++;
      if (index.current % 5 !== 4) {
        setBackgroundImage(`/assets/image-${index.current % 5}.jpg`);
      } else {
        setBackgroundImage('webcam');
      }
      // turn distortion off on team section and back on on other sections
      clearTimeout(distortionAmountTimeout.current);
      if (amount === 1.0) {
        amount = 0.0;
      } else {
        amount = 1.0;
      }
      // targetDistortionAmount.current = amount;
    }

    // window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);

    return () => {
      window.removeEventListener('click', handleClick);
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
        <distortionMaterial
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
        texture1, texture2, currentDistortionAmount,
      } } />
      <WebcamTexture { ...{
        backgroundImageTexture1, backgroundImageTexture2, activeTextureIndex, targetFadeAmount,
        texture1, texture2, texture1Canvas, texture2Canvas, texture1CanvasCtx, texture2CanvasCtx, handleDrawImage, video,
      } } />
    </>
  );
}

export default PhotoDistortAndGrain;