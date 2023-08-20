import { generateProduct } from "../utils/fakerProducts.js"

class MockingProductService{
  async get(){
    let products = []
    for(let i=0; i<100; i++){
      products.push(generateProduct())
    }
    return products
  }
}

export const mockingProductService = new MockingProductService()