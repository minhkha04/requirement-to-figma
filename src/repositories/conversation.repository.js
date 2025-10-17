import conversationModel from "../models/conversation.model.js";

const ConversationRepository = {
    async createConversation(data) {
        return await conversationModel.create(data);
    },

    async updateConversation(id, updateData) {
        return await conversationModel.findByIdAndUpdate(id, updateData, { new: true });
    },

    async getConversationById(id) {
        return await conversationModel.findById(id);
    },

    async getConversations() {
        return await conversationModel.find().sort({ updatedAt: -1 });
    }
}

export default ConversationRepository;