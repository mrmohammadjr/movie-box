"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Logo from "@/app/assets/8af10c7e6b06bb978d94334ace78b62d.jpg";
import Link from "next/link";
import gsap from "gsap";
import TransitionLink from "./TransitionLink";

export interface MediaItem {
  id: number | string;
  poster_path?: string | null;
  title?: string | null;
  name?: string | null;
  release_date?: string | null;
  first_air_date?: string | null;
  vote_average?: number | null;
}

interface CardProps {
  result: MediaItem;
  link?: string;
}

const Card = ({ result, link }: CardProps) => {
  const elRef = useRef(null);
  useEffect(() => {
    const el = elRef.current;
    const tl = gsap.timeline();
    tl.to(el, { duration: 2, x: 10 });
  }, []);

  return (
    <div className="my-15">
      <div
        ref={elRef}
        className="relative group cursor-pointer lg:mx-7 max-md:mx-4 md:mx-7 max-sm:mx-7"
      >
        <TransitionLink href={`/${link}/${result.id}`}>
          <div className="rounded-3xl p-2">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${result?.poster_path}`}
              className="w-56 lg:h-80 max-sm:h-60 rounded-3xl"
              width="300"
              height="300"
              alt={"img"}
            />
            <div className="absolute lg:w-[93.2%] max-md:w-[80%] max-sm:w-[94%] min-sm:w-[94%] inset-2 rounded-2xl bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out text-white">
                <h3 className="lg:text-xl max-sm:text-sm font-bold text-yellow-400 mb-2">
                  {result?.title ? result?.title : result?.name}{" "}
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded">
                    {result?.release_date
                      ? result?.release_date
                      : result?.first_air_date}
                  </span>
                  <span className="bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded">
                    ⭐{result?.vote_average}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TransitionLink>
      </div>
    </div>
  );
};

export default Card;
