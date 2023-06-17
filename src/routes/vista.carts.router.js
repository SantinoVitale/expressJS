import express from "express";
import {cartModel } from "../dao/models/cart.model.js"

export const routerVistaCarts = express.Router()
routerVistaCarts.get("/:cid", async(req, res) => {
  let {cid} = req.params
  let carts = await cartModel.find({_id: cid}).populate("products.product")
  const cart = carts[0].products.map((p) => {
    return {
      quantity: p.quantity,
      title: p.product.title,
      description: p.product.description,
      price: p.product.price,
      category: p.product.category,

    }
  })
  return res.status(200).render("carts", {h1title: cid + " cart´s" , cart: cart})
  
})