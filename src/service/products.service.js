import { productModel } from "../dao/models/product.model.js";

class ProductsService{
  async getAllVista(page){
    const product = await productModel.paginate({}, {limit: 10, page: page || 1});
    let products = product.docs.map((p) => {
    return {
      _id: p._id.toString(),
      title: p.title,
      description: p.description,
      price: p.price
    }})
    return{
      products: products,
      pagination: product
    }
    
  }

    async get(limit, page, query, sort){
      let products = await productModel.paginate(query ? {category: query} : {} ,{limit: limit ? limit : 10, page: page ? page : 1, sort:(sort ? {price: sort}: {})})
      return products
    }

    async post(title, description, price, code, thumbail, stock, ca){
      if(!title||!description||!price||!code||!stock||!category){
        return false
    }else {

      let result = await productModel.create({
        title,
        description,
        price,
        code,
        thumbail,
        stock,
        category
      })
      return result
    }
  }

  async put(pid, productToReplace){
    if(!productToReplace.title||!productToReplace.description||!productToReplace.price||!productToReplace.code||!productToReplace.stock||!productToReplace.category){
      return false
    } else{
      let result = await productModel.updateOne({_id:pid}, productToReplace)
      return result
    }
  }

  async delete(pid){
    let result = await productModel.deleteOne({_id:pid})
    result
  }
}

export const productsService = new ProductsService()