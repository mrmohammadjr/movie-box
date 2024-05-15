import { connectMDB } from "../../../utils/db";
import Comments from "../../../models/comments";
import { NextResponse } from 'next/server'
export async function GET(res,req) {
  await connectMDB()
    const {params:{name}} = req
    const movieName = name
  try {
    const comments = await Comments.findOne({ movieName });
    return NextResponse.json({ out: comments });
  } catch (e) {
    return NextResponse.json({ out: e });
  }
}
export async function POST(req, res) {
  await connectMDB();
  const { comment, movieName } = await req.json();
  try {
    const existingComment = await Comments.findOne({ movieName });
    const data = {
      comments: comment,
      movieName
    }
    if (existingComment) {
      const updatedComments = [...existingComment.comments, data.comments];
      await Comments.updateOne({ movieName }, { $set: { comments: updatedComments } });
      console.log("comment updated");
      return NextResponse.json({ res : "comment updated" });
    } else {
      await Comments.create(data);
      console.log("new comment added");
      return NextResponse.json({ res : "new comment added" });
    }
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}