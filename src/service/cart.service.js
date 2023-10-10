import Cart from "../dao/cart.mongo.js";
import { ticketModel } from "../dao/models/ticket.model.js";
import Product from "../dao/product.mongo.js";
import { faker } from '@faker-js/faker';
import customError from "../errors/custom-error.js";
import EErros from "../errors/enum.js";

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
    const findRepeatedProduct = sameQ.products.find((e) => JSON.stringify(e.product) === JSON.stringify(pid))
    if(findRepeatedProduct){
      findRepeatedProduct.quantity += pQuantity.quantity
      sameQ.products = findRepeatedProduct
    } else {
      sameQ.products.push({product: pid, quantity: pQuantity.quantity})
    }
    const result = await cart.postProduct(cid, sameQ);
    return result
  }

  async deleteProduct(cid, pid){
    let result = await cart.getCartById(cid);
    const product = result.products.filter((e) => e._id.toString() !== pid)
    const finalResponse = await cart.deleteProduct(cid, product)
    return finalResponse
  }

  async updateCart(cid, product){
    const result = await cart.updateCart(cid, product)
    return result
  }

  async updateProduct(cid, pid, pQuantity){
    let result = await cart.getCartById(cid)
    const findProduct = result.products.find((e) => JSON.stringify(e.product._id) === JSON.stringify(pid))
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
    if(!carts.products) return false;
    const cartVista = carts.products.map((p) => {
      return {
        id: p._id,
        quantity: p.quantity,
        title: p.product.title,
        description: p.product.description,
        price: p.product.price,
        category: p.product.category,
      }
    })
    return cartVista
  }

  async purchase(cid, requser, req){
    let getCart = await cart.getCartById(cid)
    let cartProducts = getCart.products
    let totalTicket = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      let product = cartProducts[i];
      if (product.quantity <= product.product.stock) {
        let productClass = new Product();
        let currentProduct = product.product;
        currentProduct.stock -= product.quantity;
        totalTicket += currentProduct.price * product.quantity;
        await productClass.putProduct(product.product._id, currentProduct);
        cartProducts.splice(i, 1);
        i--; // Ajustamos el índice después de eliminar un elemento
      }
      if(product.product.owner === requser.email){
        req.logger.error("NO SE PUEDE COMPRAR UN PRODUCTO SIENDO EL OWNER DEL MISMO")
        return false
      }
    }

    getCart.products = cartProducts;
    const putCart = await cart.updateCart(cid, getCart.products);

    let date = new Date(Date.now()).toLocaleString();
    let code = faker.database.mongodbObjectId();
    let user = requser.email;

    const result = await ticketModel.create({code, purchaser: user, purchase_datetime: date, amount: totalTicket});
    return {
      ticket: result,
      itemsWithNoStock: getCart.products,
      status: true
    }
  }
}

export const cartsService = new CartsService()