import mongoose from "mongoose";
import Assert from "assert"
import { mongourl } from "../src/app.js";
import Product from "../src/dao/product.mongo.js";

mongoose.connect(mongourl)

const assert = Assert.strict

describe("Testing products Dao", () => {
  before(function () {
    this.ProductDAO = new Product()
  })
  beforeEach(function(){
    this.timeout(5000)
  })
  it("1) El Dao debe de poder obtener los productos en formato de arreglo", async function(){
    console.log(this.ProductDAO);
    const result = await this.ProductDAO.getAll();
    assert.strictEqual(Array.isArray(result), false)
  })
  it("2) El Dao debe de poder agregar un producto correctamente a la base de datos", async function(){
    let mockProduct = {
      title: "PruebaMock",
      description: "Descricion de prueba",
      price: 200,
      code: "abc123",
      thumbail: [],
      stock: 30,
      category: "PruebasMock",
      owner: "Admin"
    }
    const result = await this.ProductDAO.postProduct(mockProduct.title, mockProduct.description, mockProduct.price, mockProduct.code, mockProduct.thumbail, mockProduct.stock, mockProduct.category)
    assert.ok(result._id)
  })
  it("3) El Dao debe de poder agregar un producto correctamente a la base de datos y luego cambiar el titulo por otro", async function(){
    let mockProduct = {
      title: "PruebaMock",
      description: "Descricion de prueba",
      price: 200,
      code: "abc123",
      thumbail: [],
      stock: 30,
      category: "PruebasMock",
      owner: "Admin"
    }
    const result = await this.ProductDAO.postProduct(mockProduct.title, mockProduct.description, mockProduct.price, mockProduct.code, mockProduct.thumbail, mockProduct.stock, mockProduct.category)
    
    const product = await this.ProductDAO.putProduct(result._id, {title: "NUEVAPRUEBA"})
    assert.strictEqual(product.modifiedCount, 1)
  })
})