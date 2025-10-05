"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterProps {
  path: string;
  children?: React.ReactNode;
  activeTab: string;
  currentPage: number;
}

export function Filter({ path, children, activeTab, currentPage }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function selectGenre(genre: string, page: number = 1) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(path, `${genre},${page}`);
    router.push(`/${path}?${params.toString()}`);
  }

  function countPlus() {
    selectGenre(activeTab, currentPage + 1);
  }

  function countMinus() {
    if (currentPage > 1) {
      selectGenre(activeTab, currentPage - 1);
    }
  }

  const filterTabs = [
    { id: "top_rated", label: "Top Rated" },
    {
      id: `${path === "tv" ? "airing_today" : "now_playing"}`,
      label: `${path === "tv" ? "Airing Today" : "Updated Movies"}`,
    },
    { id: "popular", label: "Popular" },
    {
      id: `${path === "tv" ? "on_the_air" : "upcoming"}`,
      label: `${path === "tv" ? "On The Air" : "Upcoming"}`,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="bg-neutral-900 w-full max-w-4xl flex flex-wrap justify-center p-5 gap-4 my-10 rounded-3xl">
        <h1 className="text-white mr-2">Filter:</h1>
        {filterTabs.map((item) => (
          <p
            key={item.id}
            onClick={() => selectGenre(item.id, 1)}
            className={`transition-all duration-100 hover:text-white hover:border-b-2 hover:border-amber-500 cursor-pointer ${
              item.id === activeTab
                ? "text-white border-b-2 border-amber-500"
                : "text-gray-500"
            }`}
          >
            {item.label}
          </p>
        ))}
      </div>
      {children && children}
      <div className="flex justify-around w-full max-w-4xl mb-10 mt-5">
        <button
          onClick={countMinus}
          disabled={currentPage <= 1}
          className="cursor-pointer bg-neutral-900 border-2 rounded-3xl px-4 py-2 border-white transition-all duration-100 hover:border-amber-500 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={countPlus}
          className="cursor-pointer bg-neutral-900 border-2 rounded-3xl px-4 py-2 border-white transition-all duration-100 hover:border-amber-500 hover:bg-black"
        >
          Next
        </button>
      </div>
    </div>
  );
}