import ConversationRepository from "../repositories/conversation.repository.js";
import { getIO } from "../socketIO/index.js";
import { safeParseJson } from "../utils/json.util.js";
import GeminiService from "./gemini.service.js";
import MessageService from "./message.service.js";

const ConversationService = {
    async createConversation(title) {
        const conversation = await ConversationRepository.createConversation({ title })
        await MessageService.createMessage({
            conversationId: conversation._id,
            text: "Chào bạn 👋, bạn cần tôi hỗ trợ tạo Figma cho trang nào?",
            sender: "system"
        });

        return conversation;
    },

    async updateAfterMessage(conversationId, messageText) {
        const conversation = await ConversationRepository.getConversationById(conversationId);

        let newCount = conversation.messageCount + 1;

        if (conversation.messageCount === 1) {
            await ConversationRepository.updateConversation(conversationId, { goal: messageText, messageCount: newCount });
        } else {
            await ConversationRepository.updateConversation(conversationId, { messageCount: newCount });
        }

    },

    async getConversationById(conversationId) {
        return await ConversationRepository.getConversationById(conversationId);
    },

    async updateFacts(conversationId, newFacts) {
        const conversation = await ConversationRepository.getConversationById(conversationId);

        const updatedFacts = Array.from(new Set([...(conversation.facts || []), ...newFacts]));

        await ConversationRepository.updateConversation(conversationId, { facts: updatedFacts });
    },

    async getConversations() {
        return await ConversationRepository.getConversations();
    },

    async factToFigmaLayout(conversationId) {
        const conversation = await ConversationRepository.getConversationById(conversationId);
        console.log("Generating Figma layout for conversation:", conversationId);
        let jsonLayout = await GeminiService.generateFigmaPrompt(conversation.goal, conversation.facts);
        console.log("Generated Figma layout JSON:", safeParseJson(jsonLayout));
        let io = getIO();
        io.emit("figma_layout", { layout: safeParseJson(jsonLayout) });
        return safeParseJson(jsonLayout);
    }
};

export default ConversationService;