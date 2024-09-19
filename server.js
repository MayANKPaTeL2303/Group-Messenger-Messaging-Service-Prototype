const {Server} = require('socket.io')
const http = require('http')
const cors = require('cors')
const express = require('express')

const app = express();
app.use(cors(
  {
    origin: 'http://localhost:3001', // Allow only this origin
  }
));

// Create an HTTP server
const httpServer = http.createServer();

// Create a Socket.io server attached to the HTTP server
const io = new Server(httpServer);

// Listen for client connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages from clients
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all connected clients
    io.broadcast.emit('message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on a specific port
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
