import Comments from "@/app/components/Comments";
import { FavComponent } from "@/app/components/FavComponent";
import Image from "next/image";
import Imdb from "@/app/assets/imdbLogo.jpg";
import Trailer from "@/app/components/Trailer";
import { auth } from "@/auth";
type TmdbVideo = {
  key: string;
  name: string;
};
type TmdbCast = {
  id: number;
  profile_path?: string | null;
  original_name?: string | null;
  character?: string | null;
};
const MoviesDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await auth();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
  const data = await res.json();
  const videoRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  );
  const videoData = await videoRes.json();
  const filter = ((videoData?.results as TmdbVideo[] | undefined) ?? []).filter((item: TmdbVideo) => {
    if (item.name === "Official Trailer") {
      return item;
    } else if (item.name === "Trailer") {
      return item;
    } else if (item.name === "Teaser") {
      return item;
    } else if (item.name === "Clip") {
      return item;
    } else if (item.name === "Featurette") {
      return item;
    } else if (item.name === "Behind the Scenes") {
      return item;
    } else if (item.name === "Bloopers") {
      return item;
    } else if (item.name === "Sneak Peek") {
      return item;
    } else if (item.name === "First Look") {
      return item;
    }
    return item;
  });

  const creRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  );
  const creData = await creRes.json();

  return (
    <div>
      <div className="bg-[url(@/app/assets/NewProject.png)] bg-contain bg-no-repeat bg-black bg-center">
        <div className="w-full flex lg:justify-between max-md:justify-between md:justify-between max-sm:flex-col p-5 items-center bg-transparent backdrop-blur-lg lg:h-[450px]">
          <div className="lg:flex lg:flex-col max-md:flex-col md:flex-col max-sm:grid max-sm:grid-cols-2 gap-5 lg:items-start max-md:items-start md:items-start lg:w-1/2 max-sm:w-full">
            <h1 className="lg:text-6xl max-md:text-4xl md:text-4xl max-sm:text-3xl font-extrabold text-zinc-300">
              {data?.title}
            </h1>
            <h1 className="text-3xl">{data?.release_date}</h1>
            <h1 className="text-3xl flex justify-center items-center gap-2">
              <Image
                alt={"imdb"}
                height={500}
                width={500}
                className="w-10 h-10 rounded-full"
                src={Imdb}
              />{" "}
              10 / {data?.vote_average}
            </h1>
            <h1 className="text-3xl">{data?.runtime} min</h1>
            <div className="flex justify-center lg:ml-0 max-sm:ml-[100%] items-center gap-2">
              <h1 className="text-black bg-white w-fit p-1 rounded-[5px] font-bold">
                {data?.genres[0]?.name}
              </h1>

              <h1 className="text-black bg-amber-500 w-fit p-1 rounded-[5px] font-bold">
                {data?.origin_country}
              </h1>
              <h1 className="text-black bg-amber-500 w-fit p-1 rounded-[5px] font-bold">
                {data?.original_language}
              </h1>
              <h1 className="text-black bg-gray-500 w-fit p-1 rounded-[5px] font-bold">
                {data?.production_companies[0]?.name}
              </h1>
              <h1
                className={`w-fit p-1 rounded-[5px] ${
                  data.status === "Released" ? "bg-green-700" : "bg-red-500"
                }`}
              >
                {data?.status}
              </h1>
            </div>
          </div>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            className="w-64 lg:h-96 max-sm:h-80 lg:mt-0 max-sm:mt-5"
            width="300"
            height="300"
            alt={"img"}
          />
        </div>
      </div>
      <FavComponent id={Number(id)} poster={data?.poster_path as string} />
      <div className="p-5">
        <p>{data.overview}</p>
        <h1 className="text-3xl my-5">Casts</h1>
        <div className="grid lg:grid-cols-9  max-md:grid-cols-4  md:grid-cols-4 max-sm:grid-cols-4 lg:gap-0 max-sm:gap-4">
          {(creData?.cast as TmdbCast[] | undefined)?.slice(0, 14)?.map((item: TmdbCast) => (
            <div key={item?.id} className="mb-5">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${item?.profile_path}`}
                className="w-32 border-2 border-neutral-950 lg:h-48 rounded-3xl"
                width="300"
                height="300"
                alt={"img"}
              />
              <p>{item?.original_name}</p>
              <p className="text-amber-500 text-sm">{item?.character}</p>
            </div>
          ))}
        </div>
        <Trailer trailerId={filter[0]?.key} />

        <Comments id={id} title={data?.title} session={session} />
      </div>
    </div>
  );
};

export default MoviesDetails;
