"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/app/assets/NewProject.png";
import Link from "next/link";
interface CarouselItem {
  id: number;
  image: string;
  poster_path?: string
  title?: string;
}

export default function MultiCarousel() {
  const [data, setData] = useState<CarouselItem[]>([]);
  const [select, setSelect] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  async function getData() {
    const res = await fetch("/api/carouselData");
    const { results } = await res.json();
    return results;
  }

  useEffect(() => {
    const get = getData();
    console.log(
      get.then((res) => {
        setData(res);
      })
    );
  }, []);

  // Handle scroll to update selected item
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(itemCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setSelect(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center w-full py-10 bgCar h-64">
        <Image alt={"logo"} src={Logo} width={125} height={125} />
      </div>
    );
  }

  return (
    <div className="w-full py-10 bgCar">
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={cn(
              "flex-shrink-0 snap-center transition-all duration-500 ease-out",
              "transform-gpu will-change-transform",
              select === index
                ? "scale-110 opacity-100 z-10"
                : "scale-90 opacity-70 hover:opacity-85"
            )}
          >
            <div className="relative group cursor-pointer">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                alt={"item"}
                width={300}
                height="0"
                className="lg:h-80 max-md:w-72 md:h-72 max-sm:h-60 w-full object-cover transition-transform duration-300 hover:scale-110"
              />
              {item.title && (
                <div
                  className={cn(
                    "absolute bottom-4 left-4 right-4 p-3 rounded-md transition-all duration-300",
                    "bg-black/60 backdrop-blur-sm text-white",
                    select === index ? "bg-black/80" : ""
                  )}
                >
                  <Link href={`/movies/${item?.id}`}>
                    <h3 className="font-semibold text-sm truncate">
                      {item.title}
                    </h3>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
