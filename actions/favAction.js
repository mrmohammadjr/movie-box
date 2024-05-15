"use server"
import { connectMDB } from "../utils/db";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import User from "../models/user"; 
export async function favAction(props) {
  const {user:{email}} = await getServerSession(authOptions);
  await connectMDB()
  const {_id,favorite} = await User.findOne({email})
  try {
    const user = await User.updateOne({_id},{$set : {favorite:[...favorite,props]}});
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}