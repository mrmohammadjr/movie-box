import { NextResponse } from "next/server";
import { connectMDB } from "../../../utils/db";
import mongoose from "mongoose";
import User from "../../../models/user"; 
export async function POST(req) {
  await connectMDB()
  const email = await req.json();
  try {
      const user = await User.findOne({email})
      return NextResponse.json({ data: user });
  } catch (e) {
      return NextResponse.json({ data: e.message });
  }
}