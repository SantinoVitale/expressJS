import { Router } from "express";
import { productModel } from "../dao/models/product.model";

const router = Router();

router.get("/", async (req, res) => {
  try{
    let products = await productModel.find()
    res.send({result: "success", payload: products})
  } catch(error){
    console.log("Hubo un error", error);
  }
})