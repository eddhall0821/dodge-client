import { Box, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

const Projectile = ({ position, targetPosition }) => {
  const ref = useRef();
  const speedPerSecond = 20;

  useFrame((state, delta) => {
    if (ref.current) {
      const mesh = ref.current;
      const direction = targetPosition.clone().sub(mesh.position).normalize();
      const distanceToMove = speedPerSecond * delta;

      const newPosition = mesh.position
        .clone()
        .add(direction.multiplyScalar(distanceToMove));

      if (newPosition.distanceTo(targetPosition) > 0.1) {
        mesh.position.copy(newPosition);
      } else {
        mesh.position.copy(targetPosition);
      }
    }
  });
  return (
    // <RigidBody>
    <mesh ref={ref} position={position}>
      <Sphere args={[1, 32, 32]} position={[0, 0, 2]}>
        <meshStandardMaterial color="#654321" />
      </Sphere>

      {/* <Box args={[1, 0, 1]} position={[0, 0, 2]}>
        <meshBasicMaterial color="green" />
      </Box> */}
    </mesh>
    // </RigidBody>
  );
};

export default Projectile;
