import { cartModel } from "../dao/models/cart.model.js";

class CartsService{
  async post(products){
    let result = await cartModel.create({products})
    return result
  }

  async getAll(){
    const result = await cartModel.find()
    const cart = {
      carts: result
    }
    return cart
  }

  async getOne(cid){
    const cartsId = await cartModel.find({_id:cid}).populate("products.product")
    return cartsId
  }

  async postProduct(cid, pid, pQuantity){
    let sameQ = await cartModel.find({_id: cid})
    const findRepeatedProduct = sameQ[0].products.find((e) => JSON.stringify(e.product) === JSON.stringify(pid))
    if(findRepeatedProduct){
      findRepeatedProduct.quantity += pQuantity.quantity
      sameQ.products = findRepeatedProduct
    } else {
      sameQ[0].products.push({product: pid, quantity: pQuantity.quantity})
    }
    const result = await cartModel.updateOne({_id: cid}, sameQ[0])
    return result
  }

  async deleteProduct(cid, pid){
    let result = await cartModel.find({_id: cid})
    const product = result[0].products.filter((e) => JSON.stringify(e.product) !== JSON.stringify(pid))
    const update = result[0].products = product
    const finalResponse = await cartModel.updateOne({_id: cid}, {products: product})
    return finalResponse
  }

  async updateCart(cid, product){
    const result = await cartModel.updateOne({_id: cid}, {products: product})
    return result
  }

  async updateProduct(cid, pid, pQuantity){
    let result = await cartModel.find({_id: cid})
    const findProduct = result[0].products.find((e) => JSON.stringify(e.product) === JSON.stringify(pid))
    if(findProduct){
      findProduct.quantity = pQuantity.quantity
      let update = await cartModel.updateOne({_id: cid}, result[0])
      return update
    } else {
      return {status:"error",
              msg: "can´t edit the product",
              data:{}
          }
    }
  }

  async emptyCart(cid){
    const update = await cartModel.updateOne({_id: cid}, {products: []})
    return update
  }

  async getAllVista(cid){
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
    return cart
  }
}

export const cartsService = new CartsService()