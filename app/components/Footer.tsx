"use client"
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-neutral-900 p-5 flex flex-col items-center">
      <h1>- Movie Box -</h1>
      <h1>Do You Want See My Portfolio ?</h1>
      <div className="mt-5 flex gap-5 justify-center items-center bg-black text-white w-fit p-2 rounded-2xl hover:gap-2 hover:text-purple-500 transition-all">
        <BsLink45Deg />
        <Link href={"https://mrmohammadjr.github.io/portfolio-app/"}>
          Author
        </Link>
      </div>
    </div>
  );
};

export default Footer;
