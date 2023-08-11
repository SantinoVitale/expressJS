import User from "../dao/users.mongo.js"

const user = new User()
class UsersService{
  async getAll(page, limit){
    const users = await user.getAll(page, limit)
    let usuarios = users.docs.map((user) => {
      return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        carts: user.carts
      }
    })
    console.log(usuarios);
    return {
      usuarios: usuarios,
      pagination: users
    }
  }

  async userCartPost(id, cart){
    const userAdded = await user.put(id, cart)
    return userAdded
  }
}

export const usersService = new UsersService()