import PhotoDistortAndGrain from './PhotoDistortAndGrain';
import * as THREE from 'three';

const ThreeScene = () => {

  return (
    <group>
      <PhotoDistortAndGrain stage={ 1 } />
      {/* <mesh>
        <planeGeometry args={ [ 1000, 1000 ] } />
        <meshBasicMaterial>
          <primitive attach='map' object={ new THREE.TextureLoader().load('/assets/stunning-vista.png') }
            encoding={ THREE.sRGBEncoding }
          />
        </meshBasicMaterial>
      </mesh> */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={ [ 300, 300, 64 ] } />
        <meshPhysicalMaterial
          displacementScale={0.2}
          // transmission={0.99}
          reflectivity={ 0.99 }
          refractionRatio={1.98}
          color={0xffffff}
          envMapIntensity={2.9}
          ior={1.926}
          thickness={0.4}
          roughness={0}
          metalness={0.0}
          clearCoat={0.99}
          clearcoatRoughness={ 0 }
          side={ THREE.BackSide }
        >
          <primitive attach='envMap' object={ new THREE.TextureLoader().load('/assets/stunning-vista.png') }
            encoding={ THREE.sRGBEncoding }
            mapping={ THREE.EquirectangularRefractionMapping }
          />
        </meshPhysicalMaterial>
      </mesh>
    </group>
  );
};

export default ThreeScene;