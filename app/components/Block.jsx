import React from 'react';

const Block = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 max-w-lg rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">Group-Chat-App</h1>
        <p className="text-lg text-gray-700">
          The Group Messaging App is a modern, real-time communication platform built with Next.js, Node.js, Socket.io, and MongoDB, offering seamless and secure messaging for individuals and groups. It features user registration and authentication through NextAuth.js, real-time messaging powered by Socket.io, and persistent chat history stored in MongoDB. Users can create and manage group chats, receive push notifications for new messages, and enjoy a responsive, intuitive interface styled with Tailwind CSS. Designed for friends, teams, and interest groups, the app delivers a smooth and synchronized messaging experience across all devices.
        </p>
      </div>
    </div>
  );
};

export default Block;


