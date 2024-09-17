"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession(); // Get the data from the session
  const user = session?.user;

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <div className="hover:text-gray-400 transition-colors"><Link href="/">Group Chat</Link></div>
        </div>
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">
              Welcome, {user?.username || user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/login">
              <div className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200">
                Login
              </div>
            </Link>
            <Link href="/sign-up">
              <div className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all duration-200">
                Sign Up
              </div>
            </Link>
          </div>
        )}
        <Link href="/about">
              <div className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all duration-200">
                About Project 
              </div>
            </Link>
      </div>
    </nav>
  );
}
