"use client";
import Image from "next/image";
import { MediaItem } from "./Card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
interface SearchProps {
  side: string;
}
const SearchBar = ({ side }: SearchProps) => {
  const [status, setStatus] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<MediaItem[]>([]);
  async function getData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWNkYzM0OGI5MzQ0OGQxZGE0ZjgyOGQ5YmI4OGEwYiIsIm5iZiI6MTc1NDg1NzI2MS41MjEsInN1YiI6IjY4OThmZjJkOTYzOGVkOThlZGUyNGU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TRr-1nkmOoyYUPyn8wx8g8r-Di_JVnnxilYQtgnCFIY",
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`,
      options
    );

    const { results } = await response.json();
    console.log(results);
    setData(results);
  }
  useEffect(() => {
    getData();
  }, [search]);
  return (
    <div className="w-1/2">
      <div className="bg-neutral-900 rounded-3xl border-b-2 border-white p-5 flex justify-between items-center w-full">
        <input
          type="text"
          className="outline-none"
          placeholder="find what you want ..."
          value={search}
          onChange={(e) => {
            setStatus(true);
            setSearch(e.target.value);
          }}
        />
        {status ? (
          <IoMdCloseCircle
            className="cursor-pointer"
            onClick={() => {
              setSearch("");
              setStatus(false);
            }}
          />
        ) : (
          ""
        )}
      </div>
      {search.length > 1 ? (
        <div className="absolute z-30 lg:translate-x-[0] max-md:translate-x-[0px] md:translate-x-[0px] max-sm:translate-x-[-40px] translate-y-1 bg-neutral-950 p-2 rounded overflow-scroll h-[30rem] lg:w-1/2 max-md:w-[50%] md:w-[50%] max-sm:w-[80%]">
          {data.map((item: MediaItem) => (
            <Link
              key={item.id}
              className="border-b-2 border-gray-500 flex justify-between items-center py-2"
              href={`/${side}/${item.id}`}
            >
              <h1 className="">{item?.title ? item?.title : item?.name}</h1>
              <h1>⭐{item?.vote_average}</h1>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                className="w-24 h-28 rounded-3xl"
                width="300"
                height="300"
                alt={"img"}
              />
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchBar;
