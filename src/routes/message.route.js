import express from "express";
import MessageController from "../controllers/message.controller.js";

const messageRoute = express.Router();
messageRoute.get("/:conversationId", MessageController.getMessageByConversationId);

export default messageRoute;