import express from "express";
import {cartModel } from "../dao/models/cart.model.js"

export const routerVistaCarts = express.Router()
routerVistaCarts.get("/:cid", async(req, res) => {
  let {cid} = req.params
  let carts = await cartModel.find({_id: cid}).populate("products.product")
  console.log(JSON.stringify(carts));
  return res.render("carts", {h1title: "cart", carts})
  
})