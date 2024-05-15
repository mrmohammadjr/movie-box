"use server"
import { connectMDB } from "../utils/db";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import User from "../models/user";
import { revalidatePath } from 'next/cache'
export async function deleteAccount(props) {
  const {user:{email}} = await getServerSession(authOptions);
  await connectMDB()
  try {
    await User.deleteOne({ email })
     console.log("delete account completed")
     revalidatePath(`/login`)
  } catch (e) {
     console.log(e)
  }
  revalidatePath("/dashboard")
  redirect('/login')
}