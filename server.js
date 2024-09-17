import http from 'http'
import express from 'express'
import path from 'path'
import {Server} from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(8000, () => console.log(`Server Started at PORT:8000`));
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // const app = express();
// // const server = http.createServer(app);
// // const io = new Server(server, {
// //   cors: {
// //     origin: "http://localhost:3000",
// //     methods: ["GET", "POST"],
// //   },
// // });

// // // Middleware
// // app.use(express.json());
// // app.use(cors());

// // MongoDB connection
// // mongoose
// //   .connect("mongodb://localhost:27017/group-chat", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => console.log("MongoDB connected"))
// //   .catch((err) => console.log(err));

// // Message schema and model
// // const messageSchema = new mongoose.Schema({
// //   username: String,
// //   message: String,
// //   time: String,
// //   groupId: String, // For different group chats
// // });

// // const Message = mongoose.model("Message", messageSchema);

// // API route to fetch messages by group ID
// // app.get("/api/chat/:groupId", async (req, res) => {
// //   const { groupId } = req.params;
// //   try {
// //     const messages = await Message.find({ groupId });
// //     res.json(messages);
// //   } catch (error) {
// //     res.status(500).json({ error: "Unable to fetch messages" });
// //   }
// // });

// // WebSocket connection handling
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Handle receiving and broadcasting messages
//   socket.on("sendMessage", async (data) => {
//     const { username, message, time } = data;
//     const groupId = data.groupId || "default"; // Use a default group if no group is specified

//     // Save the message to the database
//     const newMessage = new Message({ username, message, time, groupId });
//     await newMessage.save();

//     // Broadcast the message to the group
//     io.emit("receiveMessage", { username, message, time });
//   });

//   // Handle user disconnection
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
