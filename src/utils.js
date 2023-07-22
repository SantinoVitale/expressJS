import { json } from "express";
import * as fs from "fs";
import bcrypt from "bcrypt";
import passport from "passport";

import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

/* PassportCall que podria usar mas adelante
export const passportCall = (strategy) => {
  return async(req, res, next) => {
    passport.authenticate(strategy, function(err, user, info){
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({error: info.messages? info.messages : info.toString()});
      }
      req.user = user;
      next();
    })(req, res, next);
  }
}*/