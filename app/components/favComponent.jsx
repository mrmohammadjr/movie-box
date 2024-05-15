"use client"
import { useTransition,useState } from 'react';
import { signIn, useSession } from 'next-auth/react' 
import {favAction} from "../../actions/favAction"
import Swal from 'sweetalert2'
export default function FavComponent({param}) {
  let [isPending, startTransition] = useTransition();
  const [like,setLike] = useState(false)
  const {data} = useSession();
  const notify = (msg) => { 
    Swal.fire({
      text: msg,
      icon: "error"
      });
    }
  return(
    <div className="flex justify-around m-2 text-amber-50">
        <button onClick={() => {
            {data == null ? notify("اول وارد حساب کاربری خود شوید") : startTransition(() => favAction(param)) }
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=> console.log("favorite")} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
        </button>
      <div>
      {like == false? (
        <svg onClick={()=> setLike(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:"24px",height:"24px",color:"white"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        ) : (
          <svg onClick={()=> setLike(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:"24px",height:"24px",color:"red"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
          )}
      </div>
    </div>
  )
}