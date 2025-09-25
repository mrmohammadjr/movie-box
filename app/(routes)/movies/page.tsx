import Card, { MediaItem } from "@/app/components/Card";
import { Filter } from "@/app/components/Filter";
import SearchBar from "@/app/components/SearchBar";

interface MoviesProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

async function Movies({ searchParams }: MoviesProps) {
  const resolvedParams = await searchParams;
  const moviesParam = resolvedParams?.movies;
  const searchArray = moviesParam?.split(",");
  
  const activeTab = searchArray?.[0] || "top_rated";
  const page = searchArray?.[1] || "1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${activeTab}?language=en-US&page=${page}`,
      options
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }
    const data = await res.json();

    return (
      <div className="flex flex-col items-center bgOriginal">
        <Filter path={"movies"} activeTab={activeTab} currentPage={parseInt(page)}>
          <SearchBar side={"movies"} />
          <div className="grid lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
            {data?.results?.map((item: MediaItem) => (
              <div key={item.id} className="">
                <Card link={"movies"} result={item} />
              </div>
            ))}
          </div>
        </Filter>
      </div>
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-white">Failed to load movies</h1>
        <p className="text-gray-400">Please try again later</p>
      </div>
    );
  }
}

export default Movies;