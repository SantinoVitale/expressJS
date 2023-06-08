import mongoose from "mongoose";

const productCollection = "products"

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: String,
  thumbail: Array, 
  stock: Number,
  category: String,
})

export const productModel = mongoose.model(productCollection, productSchema)