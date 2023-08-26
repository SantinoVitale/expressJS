import winston from "winston";
import config from "../config/dotenv.config.js";

const loggerDev = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug", //* debug + verbose + http + info + warn + error
      format: winston.format.colorize({all: true})
    }),
  ],
})

const loggerProd = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info", //* info + warn + error
      format: winston.format.colorize({ all: true})
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "warn", // * warn + error
      format: winston.format.simple(),
    })
  ]
})

export const addLogger = (req, res, next) => {
  if (config.environment === "PRODUCTION"){
    req.logger = loggerProd
  } else {
    req.logger = loggerDev
  }

  next();
}