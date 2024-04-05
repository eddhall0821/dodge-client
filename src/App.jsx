import { useState, useEffect, useRef } from "react";
import "./App.css";
import DodgeCanvas from "./components/DodgeCanvas";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { socket } from "./socket";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  newPlayerJoinedState,
  playerState,
  projectileState,
} from "./recoil/atom";
import Chat from "./components/Chat";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [player, setPlayer] = useRecoilState(playerState);
  const [chats, setChats] = useState([]);
  const setProjectileState = useSetRecoilState(projectileState);

  const [newPlayerJoined, setNewPlayerJoined] =
    useRecoilState(newPlayerJoinedState);

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

    const updateChats = (data) => {
      setChats((old) => {
        return [...old, data];
      });
    };

    const newUserJoined = (data) => {
      setNewPlayerJoined(true);
      console.log("new user joined.");
      // setNewPlayerJoined(false);
    };

    const updateProjectiles = (data) => {
      setProjectileState(data);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message", onMovePlayer);
    socket.on("update_positions", updatePositions);
    socket.on("update_chat", updateChats);
    socket.on("new_user_joined", newUserJoined);
    socket.on("update_projectiles", updateProjectiles);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_message", onMovePlayer);
      socket.off("update_positions", updatePositions);
      socket.off("update_chat", updateChats);
      socket.off("new_user_joined", newUserJoined);
      socket.off("update_projectiles", updateProjectiles);
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
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <DodgeCanvas />
        <Chat chats={chats} />
      </div>
    </>
  );
}

export default App;
