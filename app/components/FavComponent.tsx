"use client";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { BiLike, BiSolidLike } from "react-icons/bi";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deletefavAction, favAction } from "../actions/favAction";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
interface CommentFormProps {
  id: number;
  poster: string;
}

export const FavComponent = ({id, poster}: CommentFormProps) => {
  const [favStatus, setFavStatus] = useState(false);
  const router = useRouter();
  const handleFav = async () => {
    const res = await favAction(Number(id), poster);
    if (res.success) {
      setFavStatus(Boolean(res.isFavorite));
      Swal.fire({
        title: 'Success',
        text: res.success,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      
    }
    if (res.error) {
      Swal.fire({
        title: 'Error',
        text: res.error,
        icon: 'error',
        confirmButtonText: 'OK',
        });
      // keep previous state on error
    }
    

  }
  return (
    <div className="flex justify-between bg-amber-500 p-5">
      <h1>Do You Like This Movie?</h1>
      <div className="flex justify-between">
        {favStatus ? (
          <IoBookmark
            className="text-2xl"
            onClick={handleFav}
          />
        ) : (
          <IoBookmarkOutline
            className="text-2xl"
            onClick={handleFav}
          />
        )}
      </div>
    </div>
  );
};

export const DeleteFav = ({item}:{item:number}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  async function deleteFavFunc() {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const res = await deletefavAction(item)
      if(res?.success){
        router.refresh()
      }
    } finally {
      setIsDeleting(false);
    }
  }
  return(
    <FaRegTrashAlt
      onClick={deleteFavFunc}
      aria-busy={isDeleting}
      className={`absolute translate-y-[-35px] translate-x-[15px] bg-black p-1 text-2xl rounded-sm transition-all duration-150 ${isDeleting ? 'opacity-50 cursor-wait pointer-events-none animate-pulse' : 'hover:bg-red-500 cursor-pointer'}`}
    />
  )
} 
