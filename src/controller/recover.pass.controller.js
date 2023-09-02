import { apiUrl } from "../app.js";
import { RecoverCodesMongoose } from "../dao/models/recover-code.model.js";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { sendMailTransport } from "../utils/mailTransport.js";
import crypto from "crypto";

class RecoverPassController {
  async sendMail(req, res){
    const code = crypto.randomBytes(32).toString("hex")
    const { email } = req.body
    const createdRecoverCodes = await RecoverCodesMongoose.create({email, code, expire: Date.now() + 1 * 60 * 60 * 1000});
    req.logger.debug(createdRecoverCodes);
    const result = await sendMailTransport.sendMail({
      from: process.env.GOOGLE_MAIL,
      to: email,
      subject: "Recuperar tu contraseña",
      html:`
          <div>
              <a href="${apiUrl}/recover-pass/getMail?code=${code}&email=${email}">Codigo para recuperar tu contraseña: </a>${code}
          </div>
      `    
  })
  req.logger.debug(result)
  return res.render("recover-pass")
  }

  async getMail(req, res){
    const { code, email} = req.query;
    const foundRecoverCode = await RecoverCodesMongoose.findOne({ email, code})
    if(Date.now() < foundRecoverCode.expire){
      res.render("recover-form", {code: code, email: email})
    } else {
      req.logger.error("El codigo de recuperacion está vencido")
      res.render("error")
    }
  }

  async getForm(req, res){
    return res.render("recover-main")
  }

  async changePass(req, res){
    const {password, email, code} = req.body
    const foundRecoverCode = await RecoverCodesMongoose.findOne({ email, code})
    if(Date.now() < foundRecoverCode.expire){
      const checkUser = await userModel.findOne({email: email})
      if(isValidPassword(checkUser, password)){
        req.logger.error("La contraseña nueva es la misma que la anterior, porfavor cambiela")
        return res.render("error")
      }else {
        const updatePassword = await userModel.updateOne({email: email}, {password: createHash(password)})
        req.logger.debug(updatePassword)

        return res.render("success-recovery")
      }
      
    } else {
      req.logger.error("El codigo de recuperacion está vencido")
      res.render("error")
    }
  }
}

export const recoverPassController = new RecoverPassController()