import express from "express";
import { productModel } from "../dao/models/product.model.js";
import {cartModel } from "../dao/models/cart.model.js"

export const routerVistaProducts = express.Router()
routerVistaProducts.get("/", async(req, res) => {
  let products = await productModel.find().lean()
  let carts = await cartModel.find().lean()
  
  return res.render("home", {h1title: "products", products, carts})
})

routerVistaProducts.post("/", async(req, res) => {
  let pQuantity = req.body
  console.log(pQuantity);
  
})