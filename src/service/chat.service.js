import { chatModel } from "../dao/models/chat.model.js";

class ChatService {
  async validateAddMessage(user, message) {
    if (!user || !message) {
      console.log("validation error: please complete the fields.");
      throw "VALIDATION ERROR";
    }
  }

  async getAllMessages() {
    const messages = chatModel.find({});
    return messages;
  }

  async addMessage({ user, message }) {
    this.validateAddMessage(user, message);
    const messageCreate = await chatModel.create({
      user,
      message,
    });
    return messageCreate;
  }
}

export const chatService = new ChatService();