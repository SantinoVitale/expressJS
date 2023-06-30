import express from "express";
import { userModel } from "../dao/models/user.model.js";

export const vistaUsers = express.Router();
vistaUsers.get("/", async(req, res) => {
  const { page, limit } = req.query
  const users = await userModel.paginate({}, {limit: limit || 10, page: page || 1})
  let usuarios = users.docs.map((user) => {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  })
  return res.status(200).render("users", {
    users: usuarios,
    pagingCounter: users.pagingCounter,
    totalPages: users.totalPages,
    page: users.page,
    hasPrevPage: users.hasPrevPage,
    hasNextPage: users.hasNextPage,
    prevPage: users.prevPage,
    nextPage: users.nextPage
  })
})