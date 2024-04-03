import { io } from "socket.io-client";

const ip = "http://129.153.88.212:4000";
const local = "http://localhost:4000";

const URL = process.env.NODE_ENV === "production" ? ip : local;

export const socket = io(URL);
