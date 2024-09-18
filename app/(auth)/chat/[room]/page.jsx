"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSession } from "next-auth/react";
import axios from "axios";

const socket = io("http://localhost:5000");

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const { data: session } = useSession(); // Get session data
  const user = session?.user;

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("/api/send-message", message);
      // console.log("Message Sended", response.data);

      const senderUsername = user?.username || user?.email || username;

      if (message && senderUsername) {
        const messageData = {
          username: senderUsername,
          message,
          time: new Date().toLocaleTimeString(),
        };
        

        socket.emit("sendMessage", messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setMessage("");
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
      {session ? (
        <div className="flex items-center justify-center p-4 bg-gray-100">
          <div className="text-lg font-semibold text-gray-800">
            {user?.username || user?.email}
          </div>
        </div>
      ) : (
        <input
        type="text"
          placeholder="Enter your username"
          className="border border-gray-300 rounded-l px-4 py-2 w-1/4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      )}

      <input
        type="text"
        placeholder="Type a message..."
        className="border text-black border-gray-300 rounded-l px-4 py-2 flex-grow"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
