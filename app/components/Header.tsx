"use client";
import Image from "next/image";
import Logo from "@/app/assets/NewProject.png";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import TransitionLink from "./TransitionLink";
import { IoMdLogIn } from "react-icons/io";
interface DataProps {
  session: import("next-auth").Session | null;
}
const Header = ({ session }: DataProps) => {
  console.log("session", session)
  return (
    <div className="w-full flex justify-between items-center p-4 bg-neutral-900">
      <div className="flex justify-between items-center gap-10">
        <TransitionLink href="/">
          <Image alt={"logo"} src={Logo} width={125} height={125} />
        </TransitionLink>
        <TransitionLink
          href="/movies"
          className="transition-all duration-100 hover:text-amber-500 hover:font-bold lg:block md:block sm:hidden max-sm:hidden"
        >
          Movies
        </TransitionLink>
        <TransitionLink
          href="/tv"
          className="transition-all duration-100 hover:text-amber-500 hover:font-bold lg:block md:block sm:hidden max-sm:hidden"
        >
          TV
        </TransitionLink>
      </div>
      {session === null ? (
        <TransitionLink href="/login">
          <IoMdLogIn className="bg-yellow-600 p-1 rounded-full text-4xl hover:text-yellow-600 hover:bg-white transition-all lg:block md:block sm:hidden max-sm:hidden" />
        </TransitionLink>
      ) : (
        <TransitionLink href="/profile">

          <FaUserCircle className="bg-yellow-600 p-1 rounded-full text-4xl hover:text-yellow-600 hover:bg-white transition-all lg:block md:block sm:hidden max-sm:hidden" />
        </TransitionLink>
      )}
    </div>
  );
};

export default Header;
