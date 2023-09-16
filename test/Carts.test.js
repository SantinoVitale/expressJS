import mongoose from "mongoose";
import Assert from "assert"
import { mongourl } from "../src/app.js";
import Cart from "../src/dao/cart.mongo.js";

mongoose.connect(mongourl)

const assert = Assert.strict

describe("Testing carts Dao", () => {
  before(function () {
    this.CartsDAO = new Cart()
  })
  beforeEach(function(){
    this.timeout(5000)
  })
  it("1) El Dao debe de poder obtener los productos en formato de arreglo", async function(){
    console.log(this.CartsDAO);
    const result = await this.CartsDAO.getAllCarts();
    assert.strictEqual(Array.isArray(result), true)
  })
  it("2) El Dao debe de poder crear un carrito correctamente a la base de datos", async function(){
    let mockCart = {
      products: [
        {
          title: "PruebaMock",
          description: "Descricion de prueba",
          price: 200,
          code: "abc123",
          thumbail: [],
          stock: 30,
          category: "PruebasMock",
          owner: "Admin",
          quantity: 1
        }
      ],
      users: "64d5498662b3882f1ee55da0"
    }
    const result = await this.CartsDAO.createCart(mockCart.products, mockCart.users)
    assert.ok(result._id)
    console.log(result);
  })
  it("3) El Dao debe de poder encontrar correctamente el carrito por su id en la base de datos", async function(){
    let mockCart = {
      products: [
        {
          title: "PruebaMock",
          description: "Descricion de prueba",
          price: 200,
          code: "abc123",
          thumbail: [],
          stock: 30,
          category: "PruebasMock",
          owner: "Admin"
        }
      ],
      users: "64d5498662b3882f1ee55da0"
    }
    const result = await this.CartsDAO.createCart(mockCart.products, mockCart.users)
    
    const cart = await this.CartsDAO.getCartById(result._id)
    console.log(cart);
    assert.strictEqual(typeof cart, "object")
  })
})