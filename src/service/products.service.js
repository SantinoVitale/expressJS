import Product from "../dao/product.mongo.js"
import ProductDTO from "../dao/DTO/product.dto.js"

const product = new Product()

class ProductsService{
  async getAllVista(page){
    const productVista = await product.getAllVista(page)
    let productsDTO = new ProductDTO(productVista)
    return productsDTO
  }

    async get(limit, page, query, sort){
      let products = await product.getAll(limit, page, query, sort)
      return products
    }

    async post(title, description, price, code, thumbail, stock, category, ownerRole, ownerEmail){
      if(!title||!description||!price||!code||!stock||!category){
        return false
    }else {
        let result = await product.postProduct(title, description, price, code, thumbail, stock, category, ownerRole, ownerEmail)
        return result
    }
  }

  async put(pid, productToReplace){
    if(!productToReplace.title||!productToReplace.description||!productToReplace.price||!productToReplace.code||!productToReplace.stock||!productToReplace.category){
      return false
    } else{
      let result = await product.putProduct(pid, productToReplace)
      return result
    }
  }

  async delete(pid){
    let result = await product.deleteProduct(pid)
    return result
  }
}

export const productsService = new ProductsService()