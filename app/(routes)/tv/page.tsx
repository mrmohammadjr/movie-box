import Card, { MediaItem } from "@/app/components/Card";
import { Filter } from "@/app/components/Filter";
import SearchBar from "@/app/components/SearchBar";

async function Tv() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  const res = await fetch(
    `  https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`,
    options
  );
  const data = await res.json();

  return (
    <div className="flex flex-col items-center bgOriginal">
      <Filter path="tv" activeTab="tv" currentPage={1}>
        {/* You can add children here if needed */}
      </Filter>
      <SearchBar side="tv" />
      <div className="grid lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
        {(data?.results as MediaItem[] | undefined)?.map((item: MediaItem) => (
          <div key={item.id} className="">
            <Card link={"tv"} result={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Tv;
