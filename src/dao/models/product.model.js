import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products"

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: String,
  thumbail: Array, 
  stock: Number,
  category: String,
  owner: {type: String, required: true, default:"admin"}
})

productSchema.plugin(mongoosePaginate)
export const productModel = mongoose.model(productCollection, productSchema)