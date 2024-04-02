import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Map from "./Map";
import { Vector3 } from "three";
import Player from "./Player";
import { socket } from "../socket";
import { useRecoilValue } from "recoil";
import { playerState } from "../recoil/atom";
export default function DodgeCanvas() {
  const [boxPosition, setBoxPosition] = useState(new Vector3(0, 0, 0));
  const player = useRecoilValue(playerState);

  const handleClickMap = (e) => {
    socket.emit("send_message", { position: JSON.stringify(e.point) });
    setBoxPosition(e.point);
  };

  useEffect(() => {
    socket.emit("send_message", {
      position: JSON.stringify(new Vector3(0, 0, 0)),
    });
  }, []);

  return (
    <Canvas
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{ height: 800, width: 800, border: "1px solid black" }}
      camera={{ position: [0, 0, 15] }}
    >
      <directionalLight position={[0, 0, 15]} />
      <Map position={[0, 0, 0]} width={100} handleClickMap={handleClickMap} />
      {Object.entries(player).map(([key, value]) => {
        const targetPosition = JSON.parse(value.position);
        const vectorPosition = new Vector3(
          targetPosition.x,
          targetPosition.y,
          targetPosition.z
        );

        return (
          <Player key={key} targetPosition={vectorPosition} color={"red"} />
        );
      })}
      {/* <Player targetPosition={boxPosition} color={"red"} /> */}
    </Canvas>
  );
}
