import { shaderMaterial } from '@react-three/drei';
import { useRef, useEffect, useCallback, useState } from 'react';
import frag from './shaders/photoDistortAndGrainFrag.js';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext.jsx';
import useWindowSize from '@/hooks/useWindowSize.jsx';
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

const GradientMaterial = shaderMaterial(
  { u_time: 0 },
  // vertex shader
  /*glsl*/`${ vert }`,
  // fragment shader
  /*glsl*/`${ frag }`,
);

extend({ GradientMaterial });

const PhotoDistortAndGrain = ({ stage }) => {

  const { backgroundImage, setBackgroundImage } = useSiteGlobals();
  const { windowWidth, windowHeight } = useWindowSize();

  const config = useRef({
    dotsNumber: 12,
    dotsBaseRadius: window.innerHeight * .1,
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
  const isMoving = useRef(false);
  const movingTimer = useRef(null);
  const touchCanvas = useRef(null);
  const touchCanvasCtx = useRef(null);
  const texture1Canvas = useRef(null);
  const texture1CanvasCtx = useRef(null);
  const texture2Canvas = useRef(null);
  const texture2CanvasCtx = useRef(null);
  const vignetteCanvas = useRef(null);
  const vignetteCanvasCtx = useRef(null);
  const touchTexture = useRef(null);
  const texture1 = useRef(null);
  const texture2 = useRef(null);
  const touchTrail = useRef(new Array(config.current.dotsNumber));
  const material = useRef(null);
  const backgroundImageHistory = useRef([ backgroundImage, backgroundImage ]);
  const [ backgroundImageTexture1, setBackgroundImageTexture1 ] = useState(backgroundImage);
  const [ backgroundImageTexture2, setBackgroundImageTexture2 ] = useState(backgroundImage);
  const currentStage = useRef(stage);
  
  useEffect(() => {
    currentStage.current = stage;
  }, [ stage ]);

  // initialise the touchcanvas configuration
  useEffect(() => {
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
  }, []);

  const handleDrawImage = useCallback((img, visualCanvas, visualCtx, textureToChange) => {
    const cw = visualCanvas.width;
    const ch = visualCanvas.height;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    visualCtx.clearRect(0, 0, cw, ch);

    // crop and center image
    const imageMoreLandscape = (iw / ih) > (cw / ch);

    const w = imageMoreLandscape === false ? cw : iw / ih * ch;
    const h = imageMoreLandscape === true ? ch : ih / iw * cw;
    const x = cw / 2 - w / 2;
    const y = ch / 2 - h / 2;

    visualCtx.drawImage(img, x, y, w, h);

    if (targetDistortionAmount.current !== 0) {
      visualCtx.drawImage(vignetteCanvas.current, 0, 0, vignetteCanvas.current.width, vignetteCanvas.current.height, 0, 0, cw, ch);
    }

    if (textureToChange === 2) {
      activeTextureIndex.current = 1;
      targetFadeAmount.current = 0;

      if (texture2.current) {
        texture2.current = new THREE.CanvasTexture(texture2Canvas.current);
        material.current.uniforms.u_texture_2.value = texture2.current;
        texture2.current.needsUpdate = true;
        mesh.current.material.needsUpdate = true;
        material.current.uniformsNeedUpdate = true;
      }
    } else {
      activeTextureIndex.current = 0;
      targetFadeAmount.current = 1;
      
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
    const newTouchCanvas = document.createElement('canvas');
    newTouchCanvas.width = window.innerWidth;
    newTouchCanvas.height = window.innerHeight;
    touchCanvas.current = newTouchCanvas;
    touchCanvasCtx.current = newTouchCanvas.getContext('2d');
    touchTexture.current = new THREE.CanvasTexture(touchCanvas.current);

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

    const newVignetteCanvas = document.createElement('canvas');
    newVignetteCanvas.width = window.innerWidth;
    newVignetteCanvas.height = window.innerHeight;
    vignetteCanvas.current = newVignetteCanvas;
    vignetteCanvas.current.width = 512;
    vignetteCanvas.current.height = 512;
    vignetteCanvasCtx.current = newVignetteCanvas.getContext('2d');

    texture1CanvasCtx.current.fillStyle = 'red';
    texture1CanvasCtx.current.fillRect(0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
    texture2CanvasCtx.current.fillStyle = 'red';
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

    touchCanvasCtx.current.fillStyle = 'black';
    touchCanvasCtx.current.fillRect(0, 0, touchCanvas.current.width, touchCanvas.current.height);

    const vignette = vignetteCanvasCtx.current.createRadialGradient(
      512 / 2, 512 / 2, Math.min(512, 512) / 3,
      512 / 2, 512 / 2, Math.min(512, 512) / 2,
    );

    vignette.addColorStop(0, `rgba(0, 0, 0, ${ 0 })`);
    vignette.addColorStop(1, `rgba(255, 255, 255, 255)`);

    vignetteCanvasCtx.current.fillStyle = vignette;
    vignetteCanvasCtx.current.fillRect(0, 0, 512, 512);

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

    function updateMousePosition(eX, eY) {
      if (isMoving.current === false) {
        isMoving.current = true;
      }
      clearTimeout(movingTimer.current);
      movingTimer.current = setTimeout(movingTimeout, 300);

      targetTouchPoint.current.x = eX / window.innerWidth;
      targetTouchPoint.current.y = 1.1 - Math.max(eY / window.innerHeight, .2);
    }
  }, [handleDrawImage]);



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

  const [ color ] = useState('255, 255, 255');

  const activeTextureIndex = useRef(0);
  const currentFadeAmount = useRef(0);
  const targetFadeAmount = useRef(0);

  const targetDistortionAmount = useRef(1.0);
  const currentDistortionAmount = useRef(1.0);
  const distortionAmountTimout = useRef(null);

  // assign each background image in the array so it reflects what’s on canvas 1 and 2
  useEffect(() => {
    if (activeTextureIndex.current === 1) {
      backgroundImageHistory.current[1] = backgroundImage;
      setBackgroundImageTexture2(backgroundImage);
    } else {
      backgroundImageHistory.current[0] = backgroundImage;
      setBackgroundImageTexture1(backgroundImage);
    }
  }, [ backgroundImage ]);


  // update the background image canvases
  useEffect(() => {
    const img = document.createElement('img');
    const visualCanvas = texture1Canvas.current;
    const visualCtx = texture1CanvasCtx.current;

    if (backgroundImage !== 'webcam') {
      img.crossOrigin = 'anonymous';
      img.addEventListener('load', () => {
        activeTextureIndex.current = 1;
        handleDrawImage(img, visualCanvas, visualCtx, 1);
        targetFadeAmount.current = 0;
      });
      img.src = backgroundImage;
    }
  }, [ backgroundImage, backgroundImageTexture1, handleDrawImage ]);

  useEffect(() => {
    const img = document.createElement('img');
    const visualCanvas = texture2Canvas.current;
    const visualCtx = texture2CanvasCtx.current;

    if (backgroundImageTexture2) {
      if (backgroundImageTexture2 !== 'webcam') {
        img.crossOrigin = 'anonymous';
        img.addEventListener('load', () => {
          activeTextureIndex.current = 0;
          handleDrawImage(img, visualCanvas, visualCtx, 2);
          targetFadeAmount.current = 1;
        });
        img.src = backgroundImageTexture2;
      }
    }

  }, [ backgroundImageTexture2, handleDrawImage ]);

  useEffect(() => {
    texture1CanvasCtx.current.clearRect(0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
    texture1CanvasCtx.current.clearRect(0, 0, texture1Canvas.current.width, texture1Canvas.current.height);
    texture1Canvas.current.width = 512;
    texture1Canvas.current.height = windowHeight / windowWidth * 512;
    texture2Canvas.current.width = 512;
    texture2Canvas.current.height = windowHeight / windowWidth * 512;

    if (backgroundImageHistory.current[ 1 ]) {
      if (backgroundImageHistory.current[ 1 ] !== 'webcam') {
        const img = document.createElement('img');
        const visualCanvas = texture2Canvas.current;
        const visualCtx = texture2CanvasCtx.current;
      
        img.crossOrigin = 'anonymous';
        img.addEventListener('load', () => {
          handleDrawImage(img, visualCanvas, visualCtx, 1);
        });
        img.src = backgroundImageHistory.current[ 1 ];
      }
    }

    if (backgroundImageHistory.current[ 0 ]) {
      if (backgroundImageHistory.current[ 0 ] !== 'webcam') {
        const img = document.createElement('img');
        const visualCanvas = texture1Canvas.current;
        const visualCtx = texture1CanvasCtx.current;
      
        img.crossOrigin = 'anonymous';
        img.addEventListener('load', () => {
          handleDrawImage(img, visualCanvas, visualCtx, 2);
        });
        img.src = backgroundImageHistory.current[ 0 ];
      }
    }
  }, [ windowWidth, windowHeight ]);

  // update touchCanvas
  const updateTrail = useCallback(() => {
    if (!touchCanvasCtx.current || !touchTexture.current) return;
    if (targetDistortionAmount.current === 0) {
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
    currentFadeAmount.current = lerp(currentFadeAmount.current, targetFadeAmount.current, 0.05);

    currentDistortionAmount.current = lerp(currentDistortionAmount.current, targetDistortionAmount.current, 0.05);

    updateTrail();
    if (material.current?.uniforms) {
      material.current.uniforms.u_touch_texture.value = touchTexture.current;
      material.current.uniforms.u_transition_amount.value = currentFadeAmount.current;
      material.current.uniforms.u_time.value = time;
      material.current.uniforms.u_mouse.value.x = touchPoint.current.x;
      material.current.uniforms.u_mouse.value.y = touchPoint.current.y;
      material.current.uniforms.u_distortion_amount.value = currentDistortionAmount.current;
    }
  });


  useEffect(() => {

    let amount = 0;

    const handleClick = () => {
      // turn distortion off on team section and back on on other sections
      clearTimeout(distortionAmountTimout.current);
      if (amount === 1.0) {
        amount = 0.0;
        activeTextureIndex.current = 1;
      } else {
        amount = 1.0;
        activeTextureIndex.current = 0;
      }
      targetDistortionAmount.current = amount;
      setBackgroundImage('/assets/stunning-vista.png');
    }

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
    }
  }, [ setBackgroundImage ]);

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
      <gradientMaterial
        ref={ material }
        uniforms={ uniforms.current }
        attach="material"
        side={ THREE.DoubleSide }
        transparent={ true }
        depthWrite={ false }
        depthTest={ false }
      />
      </mesh>
      <WebcamTexture { ...{
        texture1Canvas, texture2Canvas, texture1CanvasCtx, texture2CanvasCtx, vignetteCanvas, texture1, texture2
      } } />
    </>
  );
}

export default PhotoDistortAndGrain;