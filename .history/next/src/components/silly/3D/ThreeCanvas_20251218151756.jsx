import { Canvas } from '@react-three/fiber';
import ThreeScene from './ThreeScene';
import { OrthographicCamera } from '@react-three/drei';
import { useRef } from 'react';

const ThreeCanvas = ({ children, perspectiveCamera }) => {

  const camera = useRef();

  return (
    <div className='w-full h-screen fixed top-0 left-0 overflow-hidden pointer-events-none z-[999] canvas-wrapper'>
      <Canvas
        onCreated={ (state) => {
          if (state?.events?.connect) {
            if (typeof window !== 'undefined') {
              state.events.connect(window);
            }
          }
        } }
      >
        {
          perspectiveCamera !== true &&
          <OrthographicCamera
            ref={ camera }
            makeDefault={ true }
            position={ [ 0, 0, 200 ] }
            zoom={ 1 }
            near={ -10000000 }
            far={ 10000000 }
          />
        }
        <directionalLight
          intensity={ 0.5 }
          position={ [ 0, 0, 20 ] }
        />
        <ThreeScene { ...{ children } } />
      </Canvas>
    </div>
  )
};

export default ThreeCanvas;