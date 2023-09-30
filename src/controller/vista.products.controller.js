import { productsService } from "../service/products.service.js";

class VistaProductsController{
  async getAll(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    const page = req.query.page
    const result = await productsService.getAllVista(page);
    const user = req.user ? req.user : "No está logueado"
    const cart = user.carts ? user.carts[0]._id.toString() : "No tiene carrito"
    return res.status(200).render("home", {h1title: "products", products: result.products, pagingCounter: result.pagination.pagingCounter, totalPages: result.pagination.totalPages, page: result.pagination.page, hasPrevPage: result.pagination.hasPrevPage, hasNextPage: result.pagination.hasNextPage, prevPage: result.pagination.prevPage, nextPage: result.pagination.nextPage, rol: user.role, userName: user.firstName, email: user.email, cart: cart});
  }
}

export const vistaProductsController = new VistaProductsController();