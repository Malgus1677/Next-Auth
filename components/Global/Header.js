"use server";
import React from "react";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SignOut from "../auth/SignOut";

const Header = async () => {
  const Session = await getServerSession(authOptions);
  return (
    <header>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Tailwind Snippets</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/" className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link href="/protected/client" className="mr-5 hover:text-gray-900">
              Protected (client)
            </Link>
            <Link href="/protected/server" className="mr-5 hover:text-gray-900">
              Protected (server)
            </Link>
            {Session ? (
              <>
                <Link
                  href="/profile/client"
                  className="mr-5 hover:text-gray-900"
                >
                  Profile (client)
                </Link>
                <Link
                  href="/profile/server"
                  className="mr-5 hover:text-gray-900"
                >
                  Profile (server)
                </Link>
                <Link href="/dashboard" className="mr-5 hover:text-gray-900">
                  Administration
                </Link>
              </>
            ) : null}
          </nav>
          <nav>
            {Session ? (
              <SignOut />
            ) : (
              <Link href="/auth/signin" className="mr-5 hover:text-gray-900">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>
    </header>
  );
};

export default Header;
