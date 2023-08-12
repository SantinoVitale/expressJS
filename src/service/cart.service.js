import Cart from "../dao/cart.mongo.js";
import { ticketModel } from "../dao/models/ticket.model.js";
import Product from "../dao/product.mongo.js";
import { faker } from '@faker-js/faker';

const cart = new Cart();

class CartsService{
  async post(products, userOwner){
    const result = await cart.createCart(products, userOwner)
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

  async purchase(cid, requser){
    let getCart = await cart.getCartById(cid)
    let cartProducts = getCart[0].products
    let totalTicket = 0;

    cartProducts.forEach(product  => {
      if(product.quantity <= product.product.stock){
        const productClass = new Product();
        let currentProduct = product.product;
        currentProduct.stock -= product.quantity;
        totalTicket+=currentProduct.price*product.quantity;
        const changeProduct = productClass.putProduct(product.product._id, currentProduct)
        cartProducts.splice(cartProducts.findIndex(element => element.product._id == currentProduct._id), 1);     
      }
    })

    getCart[0].products = cartProducts;
    const putCart = await cart.updateCart(cid, getCart[0].products);
    

    let date = new Date(Date.now()).toLocaleString();
    let code = faker.database.mongodbObjectId();
    let user = requser.email;

    const result = await ticketModel.create({code, purchaser: user, purchase_datetime: date, amount: totalTicket});
    return {
      ticket: result,
      itemsWithNoStock: getCart[0].products
    }
  }
}

export const cartsService = new CartsService()