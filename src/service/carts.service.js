import Cart from "../dao/cart.mongo.js";

const cart = new Cart();
class CartsService{
  async post(products){
    const result = await cart.createCart(products)
    return result
  }

  async getAll(){
    const result = await cart.getAllCarts()
    const newCart = {
      carts: result
    }
    return newCart
  }

  async getOne(cid){
    const cartsId = await cart.getCartById(cid)
    return cartsId
  }

  async postProduct(cid, pid, pQuantity){
    let sameQ = await cart.getCartById(cid)
    const findRepeatedProduct = sameQ[0].products.find((e) => JSON.stringify(e.product) === JSON.stringify(pid))
    if(findRepeatedProduct){
      findRepeatedProduct.quantity += pQuantity.quantity
      sameQ.products = findRepeatedProduct
    } else {
      sameQ[0].products.push({product: pid, quantity: pQuantity.quantity})
    }
    const result = await cart.postProduct(cid, sameQ[0]);
    return result
  }

  async deleteProduct(cid, pid){
    let result = await cart.getCartById(cid);
    const product = result[0].products.filter((e) => JSON.stringify(e.product._id) !== JSON.stringify(pid))
    const update = result[0].products = product
    const finalResponse = await cart.deleteProduct(cid, product)
    return finalResponse
  }

  async updateCart(cid, product){
    const result = await cart.updateCart(cid, product)
    return result
  }

  async updateProduct(cid, pid, pQuantity){
    let result = await cart.getCartById(cid)
    const findProduct = result[0].products.find((e) => JSON.stringify(e.product._id) === JSON.stringify(pid))
    if(findProduct){
      findProduct.quantity = pQuantity.quantity
      let update = await cart.updateProduct(cid, result[0])
      return update
    } else {
      return {status:"error",
              msg: "can´t edit the product",
              data:{}
          }
    }
  }

  async emptyCart(cid){
    const update = await cart.emptyCart(cid)
    return update
  }

  async getAllVista(cid){
    let carts = await cart.getCartById(cid)
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