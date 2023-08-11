import { userModel } from "./models/user.model.js";

export default class User{
  constructor(){}

  async getAll(limit, page){
    const users = await userModel.paginate({}, {limit: limit || 10, page: page || 1})
    return users
  }

  async put(id, change){
    const result = await userModel.updateOne({_id: id}, {carts: change})
    return result
  }
}