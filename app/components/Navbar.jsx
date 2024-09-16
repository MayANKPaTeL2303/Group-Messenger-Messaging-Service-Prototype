"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data:session } = useSession(); //Get the data from the session
  const user = session?.user;
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">
          <div className="hover:text-gray-300">Group Chat</div>
        </div>
        {session ? (
          <>
            <span> Welcome, {user?.username || user?.email}</span>
            <Button
              onClick={() => {
                signOut;
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            Please Login First
            <div className="flex space-x-4">
              <Link href="/login">
                <div className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Login
                </div>
              </Link>
              <Link href="/sign-up">
                <div className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
                  Sign Up
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
