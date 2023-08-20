import { mockingProductService } from "../service/mockingprodcuts.service.js"

class MockingProductsController{
  async get(req, res){
    const result = await mockingProductService.get()
    return res.status(200).json({
      status: "success",
      payload: result
    })
  }
}

export const mockingProductController = new MockingProductsController()