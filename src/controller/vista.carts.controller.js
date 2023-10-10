import { cartsService } from "../service/cart.service.js"

class VistaCartsController{
  async getById(req, res){
    req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
    
    let {cid} = req.params
    let cartVista = await cartsService.getAllVista(cid)
    if(!cartVista) cartVista = false
    return res.status(200).render("carts", {h1title: cid + " cart´s" , cart: cartVista, cid: cid})
  }
}

export const vistaCartsController = new VistaCartsController()