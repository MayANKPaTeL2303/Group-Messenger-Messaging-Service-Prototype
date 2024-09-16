const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const socketio = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = socketio(httpServer); // Initialize Socket.io

  // Handle socket.io connections
  io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Example event listener
    socket.on('chatMessage', (msg) => {
      io.emit('message', msg); // Emit message to all clients
    });

    // Disconnect event
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // Fallback to Next.js rendering
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
