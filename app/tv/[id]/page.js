import Image from "next/image";
import Link from "next/link";
import { revalidateTag } from "next/cache"
import FavComponent from "../../components/favComponent"
export default async function tvDetails({params : {id}}) {
  async function fetchData(argument) {
    const options = JSON.parse(process.env.OPTIONS);
    let response = await fetch(`https://api.themoviedb.org/3/tv/${id}`,options)
    let result = await response.json();
    const commentsFetch = await fetch(`${process.env.APP_URL}/api/${result?.name}`,{
      method: "GET",
       cache: "no-cache",
        headers: {
          accept: 'application/json'
        },
       next: {
         tags: ["comments"]
       }
     })
      const comment = await commentsFetch.json()
      return {result,comment}
  }
    const {result,comment} = await fetchData()
    async function submitComment(e) {
      "use server"
        const comment = e.get("text");
        const sendComments = await fetch(`${process.env.APP_URL}/api/${result?.name}`,{
          method: "POST",
          cache: "no-cache",
          headers: {
            accept: 'application/json'
          },
          body: JSON.stringify({comment,movieName:result?.name})
      })
      const res = await sendComments.json()
      revalidateTag("comments")
    }
  return(
    <div className="p-1.5 mt-3">
      <div className="grid grid-cols-2">
        <Image src={`https://image.tmdb.org/t/p/w500/${result?.poster_path}`} className="rounded-2xl inset-0 h-64 w-52 object-cover" width={300} height={200} alt="Card image"/>
        <div className="flex flex-col items-center">
          <h1 className="font-extrabold text-center text-white text-3xl">{result?.name}</h1>
          <label className="text-white text-2xl">امتیاز : {result?.vote_average}</label>
          <label className="text-white text-2xl">ژانر :</label>
            {result?.genres?.map((item,index)=>(
                <h1 className="text-yellow-300 text-2xl" key={index}>{item?.name}</h1>
            ))}
        </div>
      </div>
      <h1 className="text-center m-3 text-blue-200 text-3xl">کارگردان : {result?.created_by[0]?.name}</h1>
      <div className="grid j
      grid-cols-2 my-7">
        <h1 className="text-white">اولین پخش : {result?.first_air_date}</h1>
        <h1 className="text-white">آخرین پخش : {result?.last_air_date}</h1>
        <h1 className="text-white mt-3">وضعیت پخش : {result?.status}</h1>
      </div>
      <div>
      <FavComponent param={{id:result.imdb_id,name:result.title,image:result.poster_path}}/>
      </div>
      <div className="m-1">
        <h1 className="text-white text-2xl mt-0.5">خلاصه :</h1>
        <p className="text-gray-300 mt-0.5 rounded-2xl border p-1">{result.overview}</p>
        <Image src={`https://image.tmdb.org/t/p/w500/${result?.backdrop_path}`} className="inset-0 w-72 object-cover mt-1.5 mr-8" width={300} height={200} alt="Card image"/>
      </div>
      <div className="flex flex-col m-2">
        <h1 className="text-gray-50 text-2xl">نظرات شما</h1>
        <form className="flex flex-col" action={submitComment}>
          <textarea name="text" className="bg-transparent rounded border-2 text-cyan-200 p-0.5 mt-1" placeholder="نظر خود را اینجا بنویسید ..."></textarea>
          <button className=" p-2 text-cyan-50">ارسال</button>
        </form>
        {comment?.out?.comments?.map((item,index,arr)=>{
          return(
            <p key={index} className="text-white border-r-4 m-1 p-1 overflow-scroll"> {item}</p>
          )
        })}
      </div>
    </div>
  )
}