import express from "express";
import {productModel} from "../dao/models/product.model.js"

export const routerVistaRealTimeProducts = express.Router();

routerVistaRealTimeProducts.get("/", async (req, res) => {
  let products = await productModel.find().lean()
  return res.render("realtime-products", {products});
});