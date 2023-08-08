import { userModel } from "../dao/models/user.model.js";

class UsersService{
  async getAll(page, limit){
    const users = await userModel.paginate({}, {limit: limit || 10, page: page || 1})
    let usuarios = users.docs.map((user) => {
      return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    })
    return {
      usuarios: usuarios,
      pagination: users
    }
  }
}

export const usersService = new UsersService()