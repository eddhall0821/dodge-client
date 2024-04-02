import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Player = ({ targetPosition }) => {
  const meshRef = useRef();
  const speedPerSecond = 5;
  useFrame((state, delta) => {
    if (meshRef.current) {
      const mesh = meshRef.current;
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
  // console.log(targetPosition);
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

export default Player;
