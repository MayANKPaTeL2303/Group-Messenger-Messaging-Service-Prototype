import React from 'react';

const MessageCard = ({ sender, content, timestamp }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-800">{sender}</span>
        <span className="text-sm text-gray-500">{new Date(timestamp).toLocaleTimeString()}</span>
      </div>
      <p className="mt-2 text-gray-700">{content}</p>
    </div>
  );
};

const MessageCards = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message, index) => (
        <MessageCard
          key={index}
          sender={message.sender}
          content={message.content}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
};

export default MessageCards;
