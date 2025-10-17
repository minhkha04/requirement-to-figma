import ConversationService from "../services/conversation.service.js";
import { successResponse } from "../utils/response.util.js";

const ConversationController = {
    async createConversation(req, res) {
        let { title } = req.body;
        let conversation = await ConversationService.createConversation(title);

        return successResponse(res, { conversation });
    },

    async getConversations(req, res) {
        let conversations = await ConversationService.getConversations();
        return successResponse(res, { conversations });
    },

    async factsToFigmaLayout(req, res) {
        let { conversationId } = req.params;
        let layout = await ConversationService.factToFigmaLayout(conversationId);
        return successResponse(res, { layout }, "Figma layout generation initiated.");
    }
};

export default ConversationController;