import User from "../dao/users.mongo.js"
import UsersDTO from "../dao/DTO/users.dto.js"
import UsersVistaDTO from "../dao/DTO/users.vista.dto.js"

const user = new User()
class UsersService{
  async getAll(page, limit){
    const users = await user.getAll(page, limit);
    const usersDTO = new UsersVistaDTO(users);
    return usersDTO;
  }

  async get(){
    const users = await user.get()
    const usersDTO = new UsersDTO(users);
    return usersDTO;
  }

  async userCartPost(id, cart){
    const userAdded = await user.put(id, cart);
    return userAdded;
  }

  async deleteById(uid){
    const deleteUser = await user.deleteById(uid)
    return deleteUser
  }
}

export const usersService = new UsersService()