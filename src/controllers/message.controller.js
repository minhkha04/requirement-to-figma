import MessageSevice from "../services/message.service.js";
import { successResponse } from "../utils/response.util.js";

const MessageController = {
    async getMessageByConversationId(req, res) {
        let { conversationId } = req.params;
        let messages = await MessageSevice.getMessages(conversationId);
        
        return successResponse(res, { messages });
    }
};

export default MessageController;