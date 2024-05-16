"use client"
import Image from "next/image";
import Link from "next/link";
import { useState,useEffect } from "react"
import Cookies from 'js-cookie'
import { signOut } from 'next-auth/react'
export function CarouselComponent(argument) {
  const [name,setName] = useState("")
  const [data,setData] = useState([])
  async function getData(argument) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDY5MDIyNzBjYjMwNGFhNWJkYWYwMWZkNzI3MDUyMiIsInN1YiI6IjY0ZjNjZTk1Y2FhNTA4MDBlOTUzMGFlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PZNd5x_CnkqmsIwX3Fj3UzvUqwQItlSohFOFw9b_py0'
      }
    }
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,options)
    let {results} = await response.json();
    setData(results)
  }
  useEffect(()=>{
    getData()
  },[name])
  return(
    <dìv className="flex flex-col place-items-center">
      <input type="text" onChange={(e)=> setName(e.target.value)} className="bg-transparent border-2 rounded-2xl p-1.5 w-64" placeHolder="The Dark Knight"/>
      <span className="popUp">
        {data?.map((item)=>(
            <div key={item?.id}>
              <Link href={`/movies/${item?.id}`}><h1 className="pt-1.5 pb-1.5">{item?.title}</h1></Link>
            </div>
        ))}
      </span>
    </dìv>
  )
}
export function ExitButton(argument) {
  return(
    <button onClick={()=> {
      Cookies.remove('name')
      signOut()
    }}>خروج</button>
  )
}