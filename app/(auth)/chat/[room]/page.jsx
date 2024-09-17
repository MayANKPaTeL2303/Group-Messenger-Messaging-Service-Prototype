// components/GroupChat.js
'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const GroupChat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message && username) {
            const messageData = {
                username,
                message,
                time: new Date().toLocaleTimeString(),
            };

            socket.emit('sendMessage', messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                <div className="flex flex-col space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="p-2 bg-white rounded shadow">
                            <strong>{msg.username}:</strong> {msg.message}
                            <span className="text-gray-400 text-sm ml-2">{msg.time}</span>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={sendMessage} className="flex p-4 bg-white">
                <input
                    type="text"
                    placeholder="Enter your username"
                    className="border border-gray-300 rounded-l px-4 py-2 w-1/4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="border text-black border-gray-300 rounded-l px-4 py-2 flex-grow"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white rounded-r px-4 py-2">
                    Send
                </button>
            </form>
        </div>
    );
};

export default GroupChat;
