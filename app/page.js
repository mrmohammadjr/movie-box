import Image from "next/image";
import Link from "next/link";
import {CarouselComponent} from "./components/carousel"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
export default async function Home() {
  const session = await getServerSession(authOptions)
  async function fetchData(argument) {
    "use server"
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.KEY
      }
    }
    let response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`,options)
    let response2 = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`,options)
    let moviesRes = await response.json();
    let tvRes = await response2.json();
    return {moviesRes,tvRes}
  }
  const {moviesRes,tvRes} = await fetchData()
  return(
    <div className="text-white mt-2 mr-1 homePage">
      <CarouselComponent />
      <h1>فیلم های اخیر</h1>
        <div className="grid grid-cols-3">
        {moviesRes?.results?.splice(0,6).map((item, index) => {
          return(
            <article key={item.id}  className="cd relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-1 mt-10 h-52">
            <Link href={`/movies/${item.id}`}>
              <Image src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="absolute inset-0 h-full w-full object-cover" width={300} height={200} alt="Card image"/>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              </Link>
              <h3 className="z-10 mt-3 font-bold text-white">{item?.title}</h3>
              <div className="z-10 gap-y-1 text-sm leading-6 text-gray-300">{item?.vote_average}</div>
            </article>
          )
        })}
      </div>
            <h1>سریال های اخیر</h1>
        <div className="grid grid-cols-3">
        {tvRes?.results?.splice(0,6).map((item, index) => {
          return(
            <article key={item.id} class="cd relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-1 mt-10 h-52">
              <Link href={`/tv/${item.id}`}>
              <Image src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="absolute inset-0 h-full w-full object-cover" width={300} height={200} alt="Card image"/>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              </Link>
              <h3 class="z-10 mt-3 font-bold text-white">{item?.name}</h3>
              <div class="z-10 gap-y-1 text-sm leading-6 text-gray-300">{item?.vote_average}</div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
