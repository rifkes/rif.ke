import { Canvas } from '@react-three/fiber';
import ThreeScene from './ThreeScene';
import { OrthographicCamera } from '@react-three/drei';
import { useRef } from 'react';

const ThreeCanvas = ({ stage, setStage }) => {

  const camera = useRef();

  return (
        <Canvas
          onCreated={ (state) => {
            if (state?.events?.connect) {
              if (typeof window !== 'undefined') {
                state.events.connect(window);
              }
            }
          } }
        >
          <OrthographicCamera
            ref={ camera }
            makeDefault={ true }
            position={ [ 0, 0, 20000 ] }
            zoom={ 1 }
            near={ -2000 }
            far={ 1000000 }
          />
          <directionalLight
            intensity={ 0.5 }
            position={ [ 0, 0, 20 ] }
          />
          <ThreeScene { ...{ stage, setStage } } />
        </Canvas>
  )
};

export default ThreeCanvas;