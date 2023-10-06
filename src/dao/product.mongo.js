import { productModel } from "./models/product.model.js";

export default class Product{
  constructor(){}

  async getAllVista(page){
    const product = await productModel.paginate({}, {limit: 10, page: page || 1});
    return product
  }

  async getAll(limit, page, query, sort){
    let products = await productModel.paginate(query ? {category: query} : {} ,{limit: limit ? limit : 10, page: page ? page : 1, sort:(sort ? {price: sort}: {})})
    return products
  }

  async getById(pid){
    let productById = await productModel.findById(pid);
    return productById;
  }

  async postProduct(title, description, price, code, thumbail, stock, category, ownerRole, ownerEmail){
    if(ownerRole === "premium"){
      let result = await productModel.create({
        title,
        description,
        price,
        code,
        thumbail,
        stock,
        category,
        owner: ownerEmail
      })
      return result
    } else {
      let result = await productModel.create({
        title,
        description,
        price,
        code,
        thumbail,
        stock,
        category,
      })
      return result
    }
    
}

  async putProduct(pid, productToReplace){
    let result = await productModel.updateOne({_id:pid}, productToReplace)
    return result
  }

  async deleteProduct(pid){
    let result = await productModel.deleteOne({_id:pid})
    return result
  }
}