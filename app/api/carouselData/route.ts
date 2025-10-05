export async function GET() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  );
  
  const data = await res.json(); // Don't forget the 'await' here
  console.log(data);
  
  return Response.json(data); // Return the data directly unless you need the 'hello' wrapper
}