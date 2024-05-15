"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Image from "next/image";
import Link from "next/link";
import { DeleteAccount } from "../components/logOutButton"
import { ExitButton } from "../components/carousel"
export default function DashboardPage(argument) {
  const [user, setUser] = useState([])
  const { data: session, status } = useSession()
  async function getData(argument) {
    const response = await fetch(`/api/dashboard`, {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(session?.user?.email)
    })
    const { data } = await response.json()
    setUser(data)
  }
  useEffect(() => {
    getData(argument)
  }, [])
  return (
    <div>
               <div className="text-white text-center p-2.5">
         <h1 className="p-5">نام کاربری: {user?.username}</h1>
         <h1 className="p-5">ایمیل : {user?.email}</h1>
         <h1 className="p-5">لیست علاقه مندی ها: </h1>
         </div>
       <div className="flex justify-around w-full">
         {user?.favorite?.length == 0 ? ( <h3 className="text-white text-center">خالی</h3>) :( 
             user?.favorite?.map((item)=>{
              return(
                <div key={item?.id} >
                 <Image src={`https://image.tmdb.org/t/p/w500/${item?.image}`} className="w-24 mb-1" width={200} height={100} alt="Card image"/>
                 </div>
                 )
               })
           )}
       </div>
       <div className="flex justify-around text-red-600 p-4">
         <ExitButton />
         <DeleteAccount />
       </div>
     </div>
  )
}