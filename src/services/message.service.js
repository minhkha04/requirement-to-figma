import MessageRepository from "../repositories/message.repository.js";
import ConversationService from "./conversation.service.js";

const MessageService = {
    async createMessage(data) {
        const { conversationId, text } = data;
        // call chat model api to get ai response
        let message = await MessageRepository.createMessage(data);
        await ConversationService.updateAfterMessage(conversationId, text);
        return message;
    },

    async getMessages(conversationId) {
        return await MessageRepository.getMessages(conversationId);
    },

}

export default MessageService;