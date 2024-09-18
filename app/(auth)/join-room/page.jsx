'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const JoinRoom = () => {
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!joinCode) {
      setMessage('Please enter a join code.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/group-join', { code: joinCode });
      console.log(response);
        setSuccess("Join Successfully")
        router.push(`/chat/${joinCode}`); 
    }
     catch (error) {
      console.error('Error joining the room:', error);
      setError("Error in joining")
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
            {loading ? "Joining in..." : "Join"}
          </button>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-600 text-center mb-4">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
