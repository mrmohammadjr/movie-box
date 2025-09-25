"use client";

// import mongoose from "mongoose";
import { useEffect, useState } from "react";
import sendComment from "../actions/comments";

interface CommentFormProps {
  title: string
  id: number | string;
   session: { user?: { name?: string | null } | null } | null;
}

export default function CommentForm({ id,title,session }: CommentFormProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  async function addComment() {
    const res = await sendComment(text, id,title);
    fetchComments();
    setText("");
  }
  async function fetchComments() {
    try {
      const response = await fetch(`/api/${id}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchComments();
  }
, [id]);
  return (
    <div className="my-5">
      <h1 className="text-3xl mb-3">Comments</h1>
      <div className="flex flex-col items-center">
        <textarea
          name="comment"
          id=""
          value={text}
          onChange={(e)=> setText(e.target.value)}
          className="outline-none w-full p-3 border border-gray-300 rounded-md disabled:opacity-50"
        ></textarea>
        <button
          onClick={addComment}
          className="rounded-sm bg-amber-500 px-3 py-1 mt-3"
        >
          submit
        </button>
      </div>
      <div className="mt-5 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 max-sm:grid-cols-1 gap-3">
      {loading ? <h1>Loading...</h1> : comments.length === 0 ? <h1>No comments yet</h1> : null}
      {comments?.map((comment, index) => (
        <div key={index} className="border-4 border-amber-500 bg-gray-900 p-3 rounded-xl ">
          <h1 className="text-xl font-bold">{session?.user?.name ? session?.user?.name:"user"}</h1>
          <h1>{comment}</h1>
        </div>
      ))}
      </div>
      
    </div>
  );
}
