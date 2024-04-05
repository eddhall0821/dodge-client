import { atom } from "recoil";
export const playerState = atom({
  key: "playerState",
  default: {},
});

export const newPlayerJoinedState = atom({
  key: "newPlayerJoinedState",
  default: false,
});

export const mySocketState = atom({
  key: "mySocketState",
  default: {
    socketId: "",
    username: "",
  },
});

export const projectileState = atom({
  key: "projectileState",
  default: {},
});
