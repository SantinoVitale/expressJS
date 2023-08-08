import { cartsService } from "../service/carts.service.js"

class VistaCartsController{
  async getById(req, res){
    let {cid} = req.params
    const cart = await cartsService.getAllVista(cid)
    return res.status(200).render("carts", {h1title: cid + " cart´s" , cart: cart})
  }
}

export const vistaCartsController = new VistaCartsController()