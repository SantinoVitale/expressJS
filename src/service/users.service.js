import User from "../dao/users.mongo.js"
import UsersVistaDTO from "../dao/DTO/users.vista.dto.js"

const user = new User()
class UsersService{
  async getAll(page, limit){
    const users = await user.getAll(page, limit)
    const usersDTO = new UsersVistaDTO(users)
    return usersDTO
  }

  async userCartPost(id, cart){
    const userAdded = await user.put(id, cart)
    return userAdded
  }
}

export const usersService = new UsersService()