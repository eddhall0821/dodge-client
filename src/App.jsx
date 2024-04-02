import { useState, useEffect, useRef } from "react";
import "./App.css";
import DodgeCanvas from "./components/DodgeCanvas";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { socket } from "./socket";
import { useRecoilState } from "recoil";
import { playerState } from "./recoil/atom";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [player, setPlayer] = useRecoilState(playerState);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected");
      setIsConnected(false);
    }

    const onMovePlayer = (data) => {
      console.log(data);
    };

    const updatePositions = (data) => {
      setPlayer(data);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message", onMovePlayer);
    socket.on("update_positions", updatePositions);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.on("receive_message", onMovePlayer);
      socket.on("update_positions", updatePositions);
    };
  }, []);
  useEffect(() => {
    // Inside your useEffect hook
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
  }, []);
  return (
    <>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <DodgeCanvas />
    </>
  );
}

export default App;
