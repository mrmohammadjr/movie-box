"use client"
import Image from "next/image";
import Link from "next/link";
import {getData} from "../../../redux/slice/dataSlice"
import FavComponent from "../../components/favComponent"
import {useState,useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
export default function MoviesDetails({params : {id}}){
  const [message,setMessage] = useState("")
  const [status,setStatus] = useState(false)
  const {data,loading} = useSelector((state)=> state.data)
  const dispatch = useDispatch()
  console.log(message);
    useEffect(()=>{
      dispatch(getData(id))
      setStatus(false)
    },[status?status:""])
    async function submitComment(argument) {
      const sendComments = await fetch(`/api/${data[0]?.title}`,{
          method: "POST",
          cache: "no-cache",
          headers: {
            accept: 'application/json'
          },
          body: JSON.stringify({comment:message,movieName:data[0]?.title})
      })
      const res = await sendComments.json()
      setStatus(true)
    }
  return(
    <div className="p-1.5 mt-3">
      {loading === true ? (
        <button type="button" className="p-3 bg-white" disabled> <svg class="animate-spin h-3 w-5 mr-3" viewBox="0 0 24 24"> </svg> مووی باکس</button>
        ) : (
          <>
                <div className="grid grid-cols-2">
        <Image src={`https://image.tmdb.org/t/p/w500/${data[0]?.poster_path}`} className="rounded-2xl inset-0 h-64 w-52 object-cover" width={300} height={200} alt="Card image"/>
        <div className="flex flex-col items-center">
          <h1 className="font-extrabold text-center text-white text-3xl">{data[0]?.title}</h1>
          <label className="text-white text-2xl">امتیاز : {data[0]?.vote_average}</label>
          <label className="text-white text-2xl">زمان : {data[0]?.runtime} دقیقه </label>
          <label className="text-white text-2xl">ژانر :</label>
            {data[0]?.genres?.map((item,index)=>(
                <h1 className="text-yellow-300 text-2xl" key={index}>{item?.name}</h1>
            ))}
        </div>
      </div>
      <h1 className="text-center m-3 text-blue-200 text-3xl">{data[0]?.release_date}</h1>
      <h1 className="text-center m-3 text-white text-3xl">وضعیت : {data[0]?.status}</h1>
      <div>
      <FavComponent param={{id:data[0]?.imdb_id,name:data[0]?.title,image:data[0]?.poster_path}}/>
      </div>
      <div className="m-1">
        <h1 className="text-white text-2xl mt-0.5">خلاصه :</h1>
        <p className="text-gray-300 mt-0.5 rounded-2xl border p-1">{data[0]?.overview}</p>
        <Image src={`https://image.tmdb.org/t/p/w500/${data[0]?.backdrop_path}`} className="inset-0 w-72 object-cover mt-1.5 mr-8" width={300} height={200} alt="Card image"/>
      </div>
                <div className="flex flex-col m-2">
        <h1 className="text-gray-50 text-2xl">نظرات شما</h1>
        <form className="flex flex-col" action={submitComment}>
          <textarea name="text" onChange={(e)=> setMessage(e.target.value)} className="bg-transparent rounded border-2 text-cyan-200 p-0.5 mt-1" placeholder="نظر خود را اینجا بنویسید ..."></textarea>
          <button className=" p-2 text-cyan-50">ارسال</button>
        </form>
        {data[1]?.out?.comments?.map((item,index,arr)=>{
          return(
            <p key={index} className="text-white border-r-4 m-1 p-1 overflow-scroll"> {item}</p>
          )
        })}
      </div>
      </>
        )}
    </div>
  )
}