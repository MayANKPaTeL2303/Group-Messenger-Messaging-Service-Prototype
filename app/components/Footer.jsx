"use client"
import React from "react";
import Link from "next/link"

const Footer = () => {
  return (
    <div>
      <>
        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <Link
                href="#"
                className="hover:underline"
              >
                Chat-App™
              </Link>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <Link href="/about" className="hover:underline me-4 md:me-6">
                  About App
                </Link>
              </li>
              <li>
                <Link href="https://github.com/MayANKPaTeL2303/Group-Messenger-Messaging-Service-Prototype" className="hover:underline me-4 md:me-6">
                  About Project 
                </Link>
              </li>
              <li>
                <Link href="https://www.imbesideyou.com/" className="hover:underline me-4 md:me-6">
                  Explore our Services
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </>
    </div>
  );
};

export default Footer;
