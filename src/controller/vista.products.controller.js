import { productsService } from "../service/products.service.js";

class VistaProductsController{
  async getAll(req, res){
    const page = req.query.page
    const result = await productsService.getAllVista(page);
    console.log(result.pagination);
    return res.status(200).render("home", {h1title: "products", products: result.products, pagingCounter: result.pagination.pagingCounter, totalPages: result.pagination.totalPages, page: result.pagination.page, hasPrevPage: result.pagination.hasPrevPage, hasNextPage: result.pagination.hasNextPage, prevPage: result.pagination.prevPage, nextPage: result.pagination.nextPage, rol: req.user.role, userName: req.user.firstName, email: req.user.email, cart: req.user.carts[0]._id.toString()})
  }
}

export const vistaProductsController = new VistaProductsController();