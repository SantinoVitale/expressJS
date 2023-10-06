import { cartModel } from "./models/cart.model.js";

export default class Cart{
  constructor(){}

  getAllCarts = async () => {
    const carts = await cartModel.find();
    return carts;
  }

  createCart = async (products, user) => {
    const newCart = await cartModel.create({products: products, users: user});
    return newCart;
  }

  getCartById = async (cid) => {
    const cart = await cartModel.find({_id:cid}).populate("products.product.title").populate("users");
    return cart;
  }

  postProduct = async (cid, newProduct) => {
    const result = await cartModel.updateOne({_id: cid}, newProduct)
    return result
  }

  deleteProduct = async (cid, product) => {
    const newCart = await cartModel.updateOne({_id: cid}, {products: product})
    return newCart
  }

  updateCart = async (cid, product) => {
    const result = await cartModel.updateOne({_id: cid}, {products: product})
    return result
  }

  updateProduct = async (cid, product) => {
    const update = await cartModel.updateOne({_id: cid}, product);
    return update
  }

  emptyCart = async (cid) => {
    const update = await cartModel.updateOne({_id: cid}, {products: []})
    return update
  }

}