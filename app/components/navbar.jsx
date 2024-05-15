"use client"
import Link from "next/link"
import {LogOutButton} from "./logOutButton"
import { useSession } from "next-auth/react"
export default function Navbar(argument) {
  const { data: session, status } = useSession()
  const data = useSession()
  return(
    <div className="navbar"> 
      <Link href={"/"}><h1 className="text-white">مووی باکس</h1></Link>
      {status === "authenticated" ? (
        <LogOutButton name={session} />
      ) : (
        <Link href={"/login"}><h1 className="text-white">ورود </h1></Link>
      )}
    </div>
  )
}