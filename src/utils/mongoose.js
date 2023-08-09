import mongoose from "mongoose";
import { mongourl, sshurl } from "../app.js";

export async function connectMongo(){
  try{
    mongoose.set("strictQuery", false)
    mongoose.connect(mongourl, (error) => {
    if(error){
        console.log("Cannot connect to database", error);
    }
    console.log("conectado pa");
    
  })
  } catch(error){
    console.log(error);
  }
  
}
