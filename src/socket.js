import { io } from "socket.io-client";

//
const socket = io("https://ajchat-pmbk.onrender.com", {
  withCredentials: true,
  autoConnect: true,
  transports: ["websocket"],
});

export default socket;
