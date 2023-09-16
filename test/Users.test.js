import mongoose from "mongoose";
import Assert from "assert"
import { mongourl } from "../src/app.js";
import User from "../src/dao/users.mongo.js";
import { userModel } from "../src/dao/models/user.model.js";

mongoose.connect(mongourl)

const assert = Assert.strict

describe("Testing users Dao", () => {
  before(function () {
    this.UsersDAO = new User()
  })
  beforeEach(function(){
    this.timeout(5000)
  })
  it("1) El Dao debe de poder obtener los usuarios de forma correcta", async function(){
    console.log(this.UsersDAO);
    const result = await this.UsersDAO.getAll();
    assert.strictEqual(Array.isArray(result), false)
  })
  it("2) El Dao debe de poder encontrar un usuario correctamente de la base de datos", async function(){
    let mockUser = {
      firstName: "UsuarioMock",
      lastName: "ApellidoMock",
      password: "passMOCK",
      email: "mock@gmail.com",
      role: "user",
      age: 18,
    }
    let result = await userModel.create(mockUser)
    assert.ok(result._id)
  })
  it("3) El Dao debe de poder modificar el carrito de un usuario por otro", async function(){
    let mockUser = {
      firstName: "UsuarioMock",
      lastName: "ApellidoMock",
      password: "passMOCK",
      email: "mock2@gmail.com",
      role: "user",
      age: 18,
      carts: [
        {
          title: "Producto prueba"
        }
      ]
    }
    let mockCart = {
      title: "NUEVO producto prueba",
    }
    let result = await userModel.create(mockUser)
    const user = await this.UsersDAO.put(result._id, mockCart)
    assert.strictEqual(user.modifiedCount, 1)
  })
})