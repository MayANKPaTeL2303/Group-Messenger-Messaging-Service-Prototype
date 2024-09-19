//Testing phase, some Optimisation and bugs can be resolve in the code 
//Group-Chat Room 
"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSession } from "next-auth/react";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState('');
  const [socket, setSocket] = useState(null);

  const { data: session } = useSession(); // Get session data
  const user = session?.user;

  useEffect(() => {
    // Initialize socket connection when the component mount
    const socketInstance = io("http://localhost:8000");
    
    //Log connection status
    socketInstance.on('connect', () => {
      console.log("Connected to WebSocket Server");
    });

    //Log Disconnection status
    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
    
    //Listening for the incoming messages 
    socketInstance.on('message', (message) => {
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    
    //Any error in connection 
    socketInstance.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    setSocket(socketInstance); // Set the socket instance in state

    // Clean up the socket connection when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []); // Empty dependency array to run once on mount
  

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const senderUsername = user?.username || user?.email || username;
      
      // Check if input is not empty and username is valid
      if (inputValue.trim() && senderUsername) {
        const messageData = {
          username: senderUsername,
          message: inputValue,
          time: new Date().toLocaleTimeString(),
        };

        setMessages((prevMessages) => [...prevMessages, messageData]);
        setInputValue('');

        // Emit the message to the server
        if (socket) {
          socket.emit('message', messageData);
          console.log("Message sent: ", messageData);
        } else {
          console.log("Socket is not connected");
        }
      }
    } catch (error) {
      console.error("Error in sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="p-2 bg-slate-300 text-gray-800 rounded shadow"
            >
              <span className="text-blue-500 shadow p-2">
                <strong>{msg.username}:</strong>
              </span>{" "}
              {msg.message}
              <span className="text-gray-500 text-sm ml-10">{msg.time}</span>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={sendMessage} className="flex p-4 bg-white">
        {!session && (
          <input
            type="text"
            placeholder="Enter your username"
            className="border border-gray-300 rounded-l text-gray-800 font-semibold px-4 py-2 w-1/4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <input
          type="text"
          placeholder="Type a message..."
          className="border text-black border-gray-300 rounded-l px-4 py-2 flex-grow"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r px-4 py-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default GroupChat;
