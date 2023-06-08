import express from "express";
import { productModel } from "../dao/models/product.model.js";

export const mongoRouter = express.Router();

mongoRouter.get("/", async (req, res) => {
  try{
    let products = await productModel.find()
    res.send({result: "success", payload: products})
  } catch(error){
    console.log("Hubo un error", error);
  }
})