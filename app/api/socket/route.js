//API for handling real-time messaging communication
import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server); //res.socket.server gives access to the HTTP server.
    res.socket.server.io = io;

    //Handling Client Connection
    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg); //This is use in-case of Group Messaging, it send update input to all other client connected
      });
    });
  }
  res.end();
};

export default SocketHandler;
