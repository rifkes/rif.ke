import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import { lerp } from 'three/src/math/MathUtils';

const MetaballsGeometry = ({ material, marchingCubes, group }) => {
  const { gl, scene } = useThree();
  const mainGroup = useRef({});
  const numblobs = useRef(12);

  useEffect(() => {
    if (material.envMap) {
      const groupCurrent = group.current;
			material.needsUpdate = true;
      material.envMap.needsUpdate = true;
      marchingCubes.current = new MarchingCubes(
        128,
        material,
        true,
        true,
      );
      marchingCubes.current.enableUvs = true;
      group.current.add(marchingCubes.current);

      return () => {
        groupCurrent && marchingCubes.current && groupCurrent.remove(marchingCubes.current);
      };
    }
  }, [ scene, gl, material ]);

  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useFrame(({ clock, mouse }) => {
    const time = clock.elapsedTime * 0.2;

    targetMouse.current = { ...mouse };
    currentMouse.current.x = lerp(currentMouse.current.x, targetMouse.current.x, 0.005);
    currentMouse.current.y = lerp(currentMouse.current.y, targetMouse.current.y, 0.005);

    const mouseX = currentMouse.current.x;
    const mouseY = currentMouse.current.y;

    if (marchingCubes.current) {
      marchingCubes.current.reset();

      const subtract = 60;
      const strength = 0.5;

      for (let i = 0; i < numblobs.current; i++) {
        const x = Math.sin((i * mouseY) + 1.26 * time * (2.03 + 0.5 * Math.cos(0.41 * i * strength - subtract))) * 0.27 + 0.5;
        const y = Math.abs(Math.cos((i * mouseX * 0.4) + 1.12 * time * Math.cos(0.22 + 20.1424 * i * strength))) * .9;// dip into the floor
        const z = 20;

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

export default MetaballsGeometry;