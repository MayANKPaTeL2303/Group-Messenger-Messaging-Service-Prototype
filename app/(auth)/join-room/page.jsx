'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const JoinRoom = () => {
  const [joinCode, setJoinCode] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!joinCode) {
      setMessage('Please enter a join code.');
      return;
    }

    try {
      const response = await axios.post('/api/group-join', { code: joinCode });
      console.log(response);
        setMessage('Successfully joined the room!');
        // Redirect to the chat room
        router.push(`/chat/${joinCode}`); // Assuming your chat room route is based on the join code
    }
     catch (error) {
      console.error('Error joining the room:', error);
      setMessage('Error joining the room. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join a Chat Room</h2>
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Join Code</label>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter join code"
              required
              className="border border-gray-300 p-2 rounded w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Join Room
          </button>
          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
