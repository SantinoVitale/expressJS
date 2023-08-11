import UsersDTO from "../dao/DTO/users.dto.js";

class ChatController {
  renderChat(req, res) {
    const user = new UsersDTO(req.user)
    return res.render("chat", {user: user});
  }
}

export const chatController = new ChatController();