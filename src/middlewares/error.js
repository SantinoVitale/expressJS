import EErros from "../errors/enum.js"

export default(error, req, res, next) => {
  console.log(error);

  switch(error.code){
    case EErros.ROUTING_ERROR:
      res
        .status(400)
        .send({status: error, error: error.name, cause: error.cause})
      break;
    case EErros.INVALID_TYPE_ERROR:
      res
        .status(404)
        .send({status: error, error: error.name, cause: error.cause})
      break;
    case EErros.DATABASE_READ_ERROR:
      res
        .status(500)
        .send({status: error, error: error.name, cause: error.cause})
      break;
    case EErros.MONGO_CONNECTION_ERROR:
      res
        .status(500)
        .send({status: error, error: error.name, cause: error.cause})
        break;
    case EErros.USER_PERMISSION_ERROR:
      res
        .status(400)
        .send({status: error, error: error.name, cause: error.cause})
        break;
    case EErros.CART_MANAGER_ERROR:
          res
            .status(400)
            .send({status: error, error: error.name, cause: error.cause})
            break;
    case EErros.PRODUCT_MANAGER_ERROR:
          res
            .status(400)
            .send({status: error, error: error.name, cause: error.cause})
            break;
    case EErros.LOGIN_MANAGER_ERROR:
          res
            .status(400)
            .send({status: error, error: error.name, cause: error.cause})
            break;
    default:
      res.status(500).send({status: "error", error: "Unhandled Error", errorSpecified: error})
      break;
  }
}