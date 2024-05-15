import mongoose from "mongoose";

export async function connectMDB(){
  if (mongoose.connections[0].readyState) {
    return true;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB Connected");
    return true
  } catch (e) {
    console.log(e)
  }
}