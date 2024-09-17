'use client'
import { useState } from 'react';

const GroupChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey everyone!', sender: 'Alice', timestamp: '10:30 AM' },
    { id: 2, text: 'Hello Alice!', sender: 'Bob', timestamp: '10:32 AM' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), text: message, sender: 'You', timestamp: new Date().toLocaleTimeString() }]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white text-lg font-semibold flex justify-between items-center">
        <div>Group Chat Room</div>
      </header>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg shadow-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              <p className="font-semibold">{msg.sender}</p>
              <p>{msg.text}</p>
              <span className="text-xs text-blue-150">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form className="p-4 bg-white border-t" onSubmit={handleSendMessage}>
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupChatRoom;

// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// let socket;

// export default function Chat() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Connect to the Socket.io server
//     socket = io();

//     // Listen for incoming messages
//     socket.on('message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     // Clean up on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Send a message when the form is submitted
//   const sendMessage = (e) => {
//     e.preventDefault();

//     if (message.trim()) {
//       socket.emit('chatMessage', message); // Emit message to the server
//       setMessage(''); // Clear input after sending
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col h-screen">
//         {/* Header */}
//         <header className="bg-blue-600 p-4 flex justify-between items-center text-white">
//           <h1 className="text-3xl">
//             <i className="fas fa-smile"></i> ChatCord
//           </h1>
//           <a href="/" className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700">
//             Leave Room
//           </a>
//         </header>

//         {/* Main Chat Section */}
//         <main className="flex flex-1">
//           <div className="w-2/3 p-4 bg-white overflow-y-auto">
//             {messages.map((msg, idx) => (
//               <div key={idx} className="message mb-4">
//                 <p className="text">{msg}</p>
//               </div>
//             ))}
//           </div>
//         </main>

//         {/* Message Form */}
//         <div className="p-4 bg-gray-100 border-t border-gray-300">
//           <form onSubmit={sendMessage} className="flex">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Enter Message"
//               className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//               required
//               autoComplete="off"
//             />
//             <button
//               type="submit"
//               className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
//             >
//               <i className="fas fa-paper-plane mr-2"></i> Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
