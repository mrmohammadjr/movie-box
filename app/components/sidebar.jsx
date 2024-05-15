"use client"
import Link from "next/link"
import React, { useState } from 'react';

export default function SideBar(){
 const [menu,setMenu] = useState(true)
  return(
  <div>
    {menu === true ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white mt-8 absolute h-6 w-6 cursor-pointer" onClick={()=> setMenu(false)}> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /> </svg> 
    ) : (
      <div className="sidebar">
        <div className="flex justify-between"><h1 className="pt-1">مووی باکس</h1>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="pl-1 h-6 w-6 cursor-pointer" onClick={()=> setMenu(true)}> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /> </svg> 
        </div>
        <Link href={"/"}><h1 className="p-0.5 m-2 border-b-2">صفحه اصلی</h1></Link>
        <Link href={"/movies"}><h1 className="p-0.5 m-2 border-b-2">فیلم</h1></Link>
        <Link href={"/tv"}><h1 className="m-2 p-0.5 border-b-2">سریال</h1></Link>
        <Link href={"/premium"}><h1 className="m-2 p-0.5 border-b-2">کاربر ویژه</h1></Link>
      </div>
    )}
  </div>
  );
};