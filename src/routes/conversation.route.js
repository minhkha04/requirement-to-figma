import express from "express";
import ConversationController from "../controllers/conversation.controller.js";

const conversationRoute = express.Router();

conversationRoute.post("/", ConversationController.createConversation);
conversationRoute.get("/", ConversationController.getConversations);
conversationRoute.post("/:conversationId/figma-layout", ConversationController.factsToFigmaLayout);

export default conversationRoute;
