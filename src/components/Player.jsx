import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { newPlayerJoinedState } from "../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import Projectile from "./Projectile";
import { Zombie } from "./Zombie";
import { Object3D, Quaternion, Vector3 } from "three";
import { Zombie2 } from "./Zombie2";
import { Box, SpotLight, Text } from "@react-three/drei";
import { removeQuote } from "../utils/utils";

const Player = ({ userId, targetPosition, clickPosition }) => {
  const meshRef = useRef();
  const textRef = useRef();

  const camera = useThree((state) => state.camera);

  const speedPerSecond = 10;
  const [newPlayerJoined, setNewPlayerJoined] =
    useRecoilState(newPlayerJoinedState);
  const [projectiles, setProjectiles] = useState([]);
  const [animation, setAnimation] = useState("CharacterArmature|Idle");

  useEffect(() => {
    if (newPlayerJoined) {
      meshRef.current.position.copy(targetPosition);
      textRef.current.position.copy(targetPosition);

      setNewPlayerJoined(false);
    }
  }, [newPlayerJoined]);

  useEffect(() => {
    if (
      meshRef?.current?.position &&
      clickPosition &&
      JSON.parse(clickPosition)
    ) {
      const jsonPosition = JSON.parse(clickPosition);
      const clickVector = new Vector3(
        jsonPosition.x,
        jsonPosition.y,
        jsonPosition.z
      );
      console.log(clickVector);
      setProjectiles([
        ...projectiles,
        { position: meshRef.current.position, targetPosition: clickVector },
      ]);
    }
    setAnimation("CharacterArmature|Idle_Attack");
  }, [clickPosition]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.up.set(0, 0, 1);
      const mesh = meshRef.current;
      const text = textRef.current;

      const direction = targetPosition.clone().sub(mesh.position).normalize();
      const distanceToMove = speedPerSecond * delta;
      const newPosition = mesh.position
        .clone()
        .add(direction.multiplyScalar(distanceToMove));
      if (newPosition.distanceTo(targetPosition) > 0.1) {
        setAnimation("CharacterArmature|Run");

        mesh.position.copy(newPosition);
        const directionXY = new Vector3(
          targetPosition.x - mesh.position.x,
          targetPosition.y - mesh.position.y,
          0
        ).normalize();
        text.position.copy(newPosition);
        const up = new Vector3(0, 1, 0);
        const quaternion = new Quaternion().setFromUnitVectors(up, directionXY);
        mesh.quaternion.slerp(quaternion, 0.2);
      } else {
        setAnimation("CharacterArmature|Idle");
        mesh.position.copy(targetPosition);
      }
    }
  });

  return (
    <>
      <mesh ref={textRef}>
        <Box args={[5, 0, 1]} position={[0, 0, 6.5]}>
          <meshBasicMaterial color="green" />
        </Box>
        <Text
          fontSize={0.8}
          rotation={[1, 0, 0]}
          position={[0, 0, 8]}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {removeQuote(userId)}
        </Text>
      </mesh>
      <mesh rotation={[0, 0, 0]} ref={meshRef} position={[0, 0, 0]}>
        <Zombie2
          animation={animation}
          scale={3}
          rotation={[Math.PI / 2, Math.PI, 0]}
        />
        {/* <sphereGeometry args={[0.5, 102, 102]} />
        <meshStandardMaterial color={"steelblue"} /> */}
      </mesh>
      {projectiles.map((proj, i) => (
        <Projectile
          key={i}
          position={proj.position}
          targetPosition={proj.targetPosition}
        />
      ))}
    </>
  );
};

export default Player;
