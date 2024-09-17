// pages/chat.js
'use client'
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connect to the Socket.io server

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('user-message', message);
      setMessage(''); // Clear the input after sending
    }
  };

  return (
    <div>
      <h1>Chatting</h1>
      <input
        type="text"
        id="message"
        placeholder="Enter Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div id="messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
