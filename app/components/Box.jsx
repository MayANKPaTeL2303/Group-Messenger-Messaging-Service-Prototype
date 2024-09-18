'use client'
import React from 'react';
import Link from "next/link";

const GroupActions = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen hover:scale-105 transform transition-transform duration-300 ease-in-out bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-80">
        <h2 className="text-xl font-semibold mb-4 text-black text-center">Group Action</h2>
        <div className="flex flex-col space-y-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            <Link href="join-room">Join Group</Link>
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
          <Link href="create-room">Create Group</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupActions;
