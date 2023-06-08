import express from "express";
import { productModel } from "../dao/models/product.model.js";

export const routerVistaProducts = express.Router()
routerVistaProducts.get("/", async(req, res) => {
  let products = await productModel.find().lean()
  return res.render("home", {h1title: "products", products})
})