//Group room chat page
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ChatRoom() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Simulate loading messages from an API
  useEffect(() => {
    // Fetch existing messages from your API or data source
    const fetchMessages = async () => {
      // Replace with your actual API endpoint
      const response = await fetch("/api/chat/messages");
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Send the new message to your API or data source
    const response = await fetch("/api/chat/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newMessage,
        sender: session.user.username,
      }),
    });

    if (response.ok) {
      const savedMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, savedMessage]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <h1>Group Chat Room</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "400px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
