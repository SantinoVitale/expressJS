import { Schema, model } from "mongoose";

export const chatModel = model(
  "messages", // COLECCION EN LA BASE DE DATOS
  new Schema({
    user: { type: String },
    message: { type: String },
  })
);