import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';

const Metaballs = (props) => {

  const marchingCubes = useRef();
  const material = useRef(new THREE.MeshPhongMaterial());
  const { gl, scene } = useThree();
  const mainGroup = useRef({});
  const numblobs = useRef(12);
  const group = useRef({});

  useEffect(() => {
    const groupCurrent = group.current;

    if (material.current.uuid) {
      marchingCubes.current = new MarchingCubes(
        44,
        material.current,
        true,
        true
      );
      marchingCubes.current.enableUvs = false;
      group.current.add(marchingCubes.current);
    }

    return () => {
      groupCurrent && marchingCubes.current && groupCurrent.remove(marchingCubes.current);
    };

  }, [ scene, gl, material ]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime * 0.2;

    if (marchingCubes.current) {
      marchingCubes.current.reset();

      const subtract = 60;
      const strength = 1;

      for (let i = 0; i < numblobs.current; i++) {
        const x = Math.sin(i + 1.26 * time * (2.03 + 0.5 * Math.cos(0.41 * i * strength - subtract))) * 0.27 + 0.5;
        const y = Math.abs(Math.cos(i + 1.12 * time * Math.cos(0.22 + 20.1424 * i * strength))) * .9;// dip into the floor
        const z = 0;

        marchingCubes.current.addBall(x, y, z, strength, subtract);
      }
      marchingCubes.current.update(gl, scene);
    }
  });

  return (
    <group ref={ mainGroup }>
      <group
        ref={ group }
        scale={ [ 4.5, 4.5, 4.5 ] }
        position={ [ 0, 0, 5 ] }
      >
      </group>
    </group>
  );
}

export default Metaballs;