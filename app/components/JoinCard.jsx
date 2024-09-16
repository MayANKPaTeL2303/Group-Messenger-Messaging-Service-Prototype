'use client'
import React from 'react'

const JoinCard = () => {
  return (
    <div>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-xl"
            src="https://cdn-icons-png.flaticon.com/512/2352/2352167.png" // Direct image URL
            alt="Profile image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Join Group  
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <form className="max-w-sm mx-auto" action="">
            <div className="mb-4">
                <label className="block mb-1">Group Code</label>
                <input
                  type="text"
                  name="grpname"
                  className="w-full text-black p-2 border rounded"
                  required
                />
              </div>
            </form>
          </span>
          <div className="flex mt-4 md:mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Join 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinCard
