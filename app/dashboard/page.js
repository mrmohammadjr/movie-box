import Image from "next/image"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import {DeleteAccount} from "../components/logOutButton"
import { ExitButton } from "../components/carousel"
export default async function dashboardPage(argument) {
   const session = await getServerSession(authOptions)
   const response = await fetch(`${process.env.APP_URL}/api/dashboard`,{
     method : "POST",
     cache : "no-cache",
     body : JSON.stringify(session?.user?.email)
   })
   const {data} = await response.json()
   return(
     <div>
       <div className="text-white text-center p-2.5">
         <h1 className="p-5">نام کاربری: {data?.username}</h1>
         <h1 className="p-5">ایمیل : {data?.email}</h1>
         <h1 className="p-5">لیست علاقه مندی ها: </h1>
         </div>
       <div className="flex justify-around w-full">
         {data?.favorite?.length == 0 ? ( <h3 className="text-white text-center">خالی</h3>) :( 
             data?.favorite?.map((item)=>{
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