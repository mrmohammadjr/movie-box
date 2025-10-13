import Image from "next/image";
import MultiCarousel from "./components/Carousel";
import Card, { MediaItem } from "./components/Card";
import Cover from "@/app/assets/cover (1) (1).jpg";
import Link from "next/link";
export default async function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
    },
  };

  const resM = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );

  const resultM = await resM.json();
  const resT = await fetch(
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  );

  const resultT = await resT.json();
  return (
    <div className="bgOriginal bg-black">
      <MultiCarousel />

      <h1 className="text-center lg:text-5xl md:text-4xl sm:text-3xl max-sm:text-3xl lg:my-10 sm:my-5 max-sm:my-5">
        Movies
      </h1>
      <div className="flex lg:justify-center md:justify-center max-md:justify-center max-sm:flex-col gap-5 items-center">
        <h1 className=" text-center text-2xl lg:my-10 sm:my-5 max-sm:my-5">
          Trending movies that are being released
        </h1>
        <Link className="bg-amber-500 text-black p-1 rounded" href={"/movies"}>
          More ...
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 sm:grid-cols-2 max-sm:grid-cols-2 gap-4">
        {(resultM?.results as MediaItem[] | undefined)
          ?.slice(0, 5)
          ?.map((item: MediaItem) => (
            <Card key={item.id} result={item} link={"movies"} />
          ))}
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-gray-300 lg:text-5xl max-md:text-3xl mt-5">
          Watch Your Favorite{" "}
          <span className="font-bold text-amber-500">Movies</span> Or{" "}
          <span className="font-bold text-amber-500">TV Shows</span>
        </h1>
        <p className="text-gray-300 text-3xl mt-5">
          With{" "}
          <span className="text-black bg-amber-500 p-1 rounded-md">
            Movie Box
          </span>
        </p>
        <Link href={"/movies/1175942"}>
          <Image
            src={Cover}
            className="w-full my-5 lg:h-96 max-sm:h-60"
            alt={"img"}
          />
        </Link>
      </div>
      <h1 className="text-center lg:text-5xl md:text-4xl sm:text-3xl max-sm:text-3xl lg:my-10 sm:my-5 max-sm:my-5">
        TV Shows
      </h1>
      <div className="flex lg:justify-center max-md:justify-center md:justify-center max-sm:flex-col gap-5 items-center">
        <h1 className="text-center text-2xl lg:my-10 sm:my-5 max-sm:my-5">
          Entertaining and popular series
        </h1>
        <Link className="bg-amber-500 text-black p-1 rounded" href={"/tv"}>
          More ...
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 sm:grid-cols-2 max-sm:grid-cols-2 gap-4">
        {(resultT?.results as MediaItem[] | undefined)
          ?.slice(0, 5)
          ?.map((item: MediaItem) => (
            <Card result={item} key={item.id} link={"tv"} />
          ))}
      </div>
    </div>
  );
}
