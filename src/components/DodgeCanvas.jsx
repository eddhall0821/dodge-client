import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Map from "./Map";
import { Vector3 } from "three";
import Player from "./Player";
import { socket } from "../socket";
import { useRecoilValue } from "recoil";
import { playerState, projectileState } from "../recoil/atom";
import Cursor from "./Cursor";
import { Physics } from "@react-three/rapier";

export default function DodgeCanvas() {
  const [boxPosition, setBoxPosition] = useState(new Vector3(0, 0, 0));

  const player = useRecoilValue(playerState);
  const [targetClickPosition, setTargetClickPosition] = useState(null);
  const projectile = useRecoilValue(projectileState);

  const handleRightClickMap = (e) => {
    socket.emit("send_message", { position: JSON.stringify(e.point) });
    setBoxPosition(e.point);
  };

  const handleClickMap = (e) => {
    const clickPosition = new Vector3(e.point.x, e.point.y, e.point.z);
    setTargetClickPosition(clickPosition);
    socket.emit("fire_normal_weapon", {
      position: JSON.stringify(clickPosition),
    });
  };

  useEffect(() => {
    socket.emit("send_message", {
      position: JSON.stringify(new Vector3(0, 0, 0)),
    });
  }, []);

  useEffect(() => {}, [projectile]);

  return (
    <>
      <Canvas
        shadows
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        style={{
          width: 1000,
          height: 700,
          border: "1px solid black",
          cursor: "cell",
        }}
        camera={{ position: [0, -40, 50], fov: 30 }}
      >
        <Suspense>
          <directionalLight castShadow position={[0, 0, 15]} intensity={1} />
          <Map
            position={[0, 0, 0]}
            width={100}
            handleRightClickMap={handleRightClickMap}
            handleClickMap={handleClickMap}
          />
          {Object.entries(player).map(([key, value]) => {
            const targetPosition = JSON.parse(value.position);
            const vectorPosition = new Vector3(
              targetPosition.x,
              targetPosition.y,
              targetPosition.z
            );

            return (
              <Player
                key={key}
                userId={value.username}
                targetPosition={vectorPosition}
                clickPosition={projectile[key]?.position}
                // clickPosition={targetClickPosition}
                color={"red"}
              />
            );
          })}
        </Suspense>
      </Canvas>
    </>
  );
}
