import mongoose from "mongoose";
import { mongourl, sshurl } from "../app.js";
import EErros from "../errors/enum.js";
import customError from "../errors/custom-error.js";

export async function connectMongo(){
  try{
    mongoose.set("strictQuery", false)
    mongoose.connect(mongourl, (error) => {
    if(error){
      return customError.createError({
        name: "Can´t connect to mongo Atlas",
        cause: "Something went wrong",
        message: "Pls contact an admin",
        code: EErros.MONGO_CONNECTION_ERROR
      })
    }
    console.log("conectado pa");
    
  })
  } catch(error){
    console.log(error);
  }
  
}
