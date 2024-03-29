import { useRef, useEffect, useState } from 'react';
import MetaballsWebcamTexture from './MetaballsWebcamTexture';
import MetaballsGeometry from './MetaballsGeometry';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Metaballs = (props) => {

  const marchingCubes = useRef();
  const [ material, setMaterial ] = useState(null);
  const mainGroup = useRef({});
  const group = useRef({});
  const video = useRef(document.createElement('video'));
  const canvas = useRef(document.createElement('canvas'));
  const webcamTexture = useRef(new THREE.CanvasTexture(canvas.current));
  const [ activeImage, setActiveImage ] = useState('none');
  const raf = useRef(null);

  useFrame(() => {
    if (group?.current?.children ?.length > 0 && activeImage === 'webcam') {
      const ctx = canvas.current.getContext('2d');
      ctx.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);
      webcamTexture.current = new THREE.CanvasTexture(canvas.current);
      webcamTexture.current.needsUpdate = true;
      webcamTexture.current.colorSpace = THREE.SRGBColorSpace;
      webcamTexture.current.mapping = THREE.EquirectangularReflectionMapping;
      if (group?.current?.children?.length > 0) {
        group.current.children[ 0 ].material.envMap = webcamTexture.current;
      }
    }
  }, [ material ]);

  useEffect(() => {
    
    const materialProps = {
      envMapIntensity: 1,
      color: 'white',
      metalness: 1.0,
      roughness: 0,
    };

    if (activeImage !== 'none') {
      if (activeImage === 'webcam') {
        canvas.current.width = video.current.videoWidth;
        canvas.current.height = video.current.videoHeight;
        const ctx = canvas.current.getContext('2d');
        ctx.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);
        
        ctx.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height);

        webcamTexture.current = new THREE.CanvasTexture(canvas.current);

        // const newTexture = new THREE.VideoTexture( video.current );
        webcamTexture.current.needsUpdate = true;
        webcamTexture.current.colorSpace = THREE.SRGBColorSpace;
        webcamTexture.current.mapping = THREE.EquirectangularReflectionMapping;

        const newMaterial = new THREE.MeshStandardMaterial({
          ...materialProps,
          envMap: webcamTexture.current,
        });
        setMaterial(newMaterial);
      } else if (activeImage === 'image') {
        const src = '/assets/gradient-test.jpg';
        newTexture.colorSpace = THREE.SRGBColorSpace;
        const newTexture = new THREE.TextureLoader().load(src, () => {
          newTexture.mapping = THREE.EquirectangularReflectionMapping;
          newTexture.needsUpdate = true;

          const newMaterial = new THREE.MeshStandardMaterial({
            ...materialProps,
            envMap: newTexture,
          });
          setMaterial(newMaterial);
        });
      }
    }
  }, [ activeImage ]);

  return (
    <group ref={ mainGroup }>
      {
        material && activeImage !== 'none' &&
        <MetaballsGeometry { ...{ group, material, marchingCubes, group } } />
      }
      <MetaballsWebcamTexture { ...{ video, canvas, marchingCubes, material, activeImage, setActiveImage } } />
    </group>
  );
}

export default Metaballs;