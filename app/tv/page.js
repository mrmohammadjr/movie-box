import Image from "next/image";
import Link from "next/link";
import { TvFetchButton } from "../components/fetchTvMvs"
export default async function tv({searchParams}) {
  const searchArray = searchParams?.tv?.split(",")
  const genre = searchArray ? searchArray[0] : 'airing_today';
  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDY5MDIyNzBjYjMwNGFhNWJkYWYwMWZkNzI3MDUyMiIsInN1YiI6IjY0ZjNjZTk1Y2FhNTA4MDBlOTUzMGFlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PZNd5x_CnkqmsIwX3Fj3UzvUqwQItlSohFOFw9b_py0'
      }
    }
  const res = await fetch(`https://api.themoviedb.org/3/tv/${genre}?language=en-US&page=${ searchArray ? searchArray[1] : 1}`,options)
  const {results} = await res.json()
  return(
    <div className="text-white">
      <div className="text-white flex justify-evenly">
        <TvFetchButton />
      </div>
      <div className="grid grid-cols-2">
        {results?.map((item)=>(
          <div key={item?.id} className="rounded m-3">
          <Link href={`/tv/${item.id}`}>
            <Image src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} className="rounded inset-0 h-full w-full object-cover" width={300} height={200} alt="Card image"/>
          </Link>
          </div>
        ))}
      </div>
    </div>
  )
}