import express from "express";
import { productModel } from "../dao/models/product.model.js";
import {cartModel } from "../dao/models/cart.model.js"

export const routerVistaProducts = express.Router()
routerVistaProducts.get("/", async(req, res) => {
  const page = req.query.page
  const product = await productModel.paginate({}, {limit: 10, page: page || 1});
  let products = product.docs.map((p) => {
    return {
      _id: p._id.toString(),
      title: p.title,
      description: p.description,
      price: p.price
    }
  })
  return res.status(200).render("home", {h1title: "products", products: products, pagingCounter: product.pagingCounter, totalPages: product.totalPages, page: product.page, hasPrevPage: product.hasPrevPage, hasNextPage: product.hasNextPage, prevPage: product.prevPage, nextPage: product.nextPage, rol: req.user.role, userName: req.user.firstName, email: req.user.email})
})