import messageModel from "../models/message.model.js";

const MessageRepository = {
    async createMessage(data) {
        return await messageModel.create(data);
    },

    async getMessages(conversationId) {
        return await messageModel.find({ conversationId }).sort({ createdAt: 1 });
    },

    async getAllMessagesByConversationId(conversationId) {
        return await messageModel.find(
            { conversationId }
        ).sort({ createdAt: 1 });
    },
}

export default MessageRepository;