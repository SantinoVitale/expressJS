class LoggerTestController{
  async get(req, res){
    req.logger.warn("TEST - ADVERTENCIA!!");
    req.logger.error("TEST -ERROR!!");
    req.logger.info("TEST - INFORMACION");
    req.logger.http("TEST - HTTP");
    req.logger.verbose("TEST - VERBOSE!");
    req.logger.debug("TEST - DEBUG");
    res.send({message: "Prueba de logger"});
  }
}

export const loggerTestController = new LoggerTestController()