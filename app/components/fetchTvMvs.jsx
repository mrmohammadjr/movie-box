'use client'
import {useState} from "react"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
export function MoviesFetchButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genre = searchParams.get('movies');
  const [counter,setCounter] = useState(1)
  const [title,setTitle] = useState("" || "upcoming")
  function countPlus(count) {
    if (count != null) {
      setCounter((l)=> l + count)
      selectGenre(title)
    }
  }
  function countMinus(count) {
    if (count != null) {
      setCounter((l)=> l - count)
      selectGenre(title)
    }
  }
  function selectGenre(params) {
    router.push(`/movies/?movies=${[params,counter]}`);
  }
  return(
    <div className="text-white flex flex-col">
      <select className="w-72 mt-5 bg-transparent border-b" onChange={(e)=> {
        selectGenre(e.target.value)
        setTitle(e.target.value)
      }}>
        <option value="upcoming">در حال انتشار </option>
        <option value="top_rated">۲۵۰ فیلم برتر</option>
        <option value="popular">انتخاب کاربران</option>
        <option value="now_playing">در حال پخش</option>
      </select>
      <div className="flex justify-around mt-5">
        <button className="border-b-2 p-1.5" onClick={()=> countMinus(counter == 0 ? null : 1)}>صفجه قبل</button>
          <button className="border-b-2 p-1" onClick={()=> countPlus(1)}>صفحه بعد</button>
      </div>
    </div>
  )
}
export function TvFetchButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genre = searchParams.get('tv');
  const [counter,setCounter] = useState(1)
  const [title,setTitle] = useState("" || "airing_today")
  function countPlus(count) {
    if (count != null) {
      setCounter((l)=> l + count)
      selectGenre(title)
    }
  }
  function countMinus(count) {
    if (count != null) {
      setCounter((l)=> l - count)
      selectGenre(title)
    }
  }
  function selectGenre(params) {
    router.push(`/tv/?tv=${[params,counter]}`);
  }
  return(
    <div className="text-white flex flex-col">
      <select className="w-72 mt-5 bg-transparent border-b" onChange={(e)=> {
        selectGenre(e.target.value)
        setTitle(e.target.value)
      }}>
        <option value="on_the_air">روی آنتن</option>
        <option value="top_rated">۲۵۰ سریال برتر</option>
        <option value="popular">انتخاب کاربران</option>
        <option value="airing_today">پخش امروز</option>
</select>
      <div className="flex justify-around mt-5">
          <button className="border-b-2 p-1.5" onClick={()=> countMinus(counter == 0 ? null : 1)}>صفجه قبل</button>
          <button className="border-b-2 p-1.5" onClick={()=> countPlus(1)}>صفحه بعد</button>
      </div>
    </div>
  )
}