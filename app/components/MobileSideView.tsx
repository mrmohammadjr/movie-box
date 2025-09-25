"use client";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import TransitionLink from "./TransitionLink";
import { IoMdLogIn } from "react-icons/io";
interface DataProps {
  session: import("next-auth").Session | null;
}
const MobileSideView = ({ session }: DataProps) => {
  return (
    <div>
      <div className="fixed sm:block md:hidden lg:hidden bg-neutral-800 bottom-1 m-3 z-50 w-[95%] p-5 shadow-2xl shadow-neutral-800">
        <div className="flex justify-between items-center gap-10">
          <TransitionLink
            href="/movies"
            className="cursor-pointer bg-neutral-900 border-2 rounded-3xl px-3 py-2 border-white transition-all duration-100 hover:border-amber-500 hover:bg-black"
          >
            Movies
          </TransitionLink>
          <TransitionLink
            href="/tv"
            className="cursor-pointer bg-neutral-900 border-2 rounded-3xl px-3 py-2 border-white transition-all duration-100 hover:border-amber-500 hover:bg-black"
          >
            TV
          </TransitionLink>
          {session === null ? (
            <TransitionLink href="/login">
              <IoMdLogIn className="bg-yellow-600 p-1 rounded-full text-4xl hover:text-yellow-600 hover:bg-white transition-all sm:block md:hidden lg:hidden max-sm:block" />
            </TransitionLink>
          ) : (
            <TransitionLink href="/profile">
            <FaUserCircle className="bg-yellow-600 p-1 rounded-full text-4xl hover:text-yellow-600 hover:bg-white transition-all sm:block md:hidden lg:hidden max-sm:block" />
            </TransitionLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSideView;
