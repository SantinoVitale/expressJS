import mongoose from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products"
    },
    quantity: Number
  }],
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

export const cartModel = mongoose.model(cartCollection, cartSchema);