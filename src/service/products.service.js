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
}

export const productsService = new ProductsService()