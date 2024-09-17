import React from 'react';

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">About Group Chat App</h1>
        <p className="text-lg text-gray-700 mb-4">
          The Group Chat App is a modern and efficient real-time messaging platform designed to enhance communication between individuals and groups. Built with cutting-edge technologies like Next.js, Node.js, Socket.io, and MongoDB, the app ensures smooth, secure, and reliable messaging across multiple devices.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          The app supports user registration, authentication, and persistent chat history, allowing users to manage their conversations and retrieve past messages anytime. With Socket.io integrated, users experience real-time updates without the need to refresh, ensuring that all conversations are instantly synchronized.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Designed for modern use cases, whether for small teams, interest groups, or personal conversations, this app comes with a clean and intuitive interface. It is fully responsive and built with Tailwind CSS, providing a seamless experience across all devices.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Whether you're chatting with a single person or in a group, our platform makes it easy to stay connected and manage conversations in a way that feels natural and productive. Push notifications ensure that you never miss out on important messages.
        </p>
        <p className="text-lg text-gray-700">
          The project aims to provide a real-time, scalable, and flexible communication system that is easy to use and adapt for a variety of communication needs, making it ideal for both personal and professional use.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;

