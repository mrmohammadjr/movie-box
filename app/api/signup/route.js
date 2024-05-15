import { connectMDB } from "../../../utils/db";
import mongoose from "mongoose";
import User from "../../../models/user"; 
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
export async function POST(req,res) {
    await connectMDB();
    const {username,email,password} = await req.json();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ res: 'Email is already in use' });
    }
      const hashedPassword = bcrypt.hashSync(password);
      const newUser = ({
        name: username,
        username,
        email,
        password: hashedPassword,
        confirmpassword: hashedPassword,
        favorite: []
      })
  try {
      await User.insertMany(newUser)
      console.log(`${username} added`)
      return NextResponse.json({res : "user added"})
  } catch (e) {
    return NextResponse.json(e)
  }
}