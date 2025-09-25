"use client";

import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
interface TrailerProps {
  trailerId: string;
}
const Trailer = ({ trailerId }: TrailerProps) => {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event: { target: { pauseVideo: () => void } }) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center gap-2">
  
        <h1 className="text-4xl my-10">Trailer</h1>
      </div>
      <YouTube
        videoId={trailerId}
        opts={opts}
        className={"border-4 w-full"}
        onReady={onReady}
      />{" "}
    </div>
  );
};

export default Trailer;
