import geminiAi from "../config/gemini.config.js"

const chatSessions = new Map();
const MAX_HISTORY = 5;

const GeminiRepository = {
    async generateContent(model, contents, systemInstruction) {
        const response = await geminiAi.models.generateContent({
            model,
            contents,
            config: {
                systemInstruction,
            },
        })
        return response.text;
    },

    async sendChatMessage(model, conversationId, userMessage, systemInstruction) {
        let chat = chatSessions.get(conversationId);

        // Nếu chưa có session → tạo mới
        if (!chat) {
            chat = geminiAi.chats.create({
                model,
                history: [],
                config: {
                    systemInstruction,
                },
            });
            chatSessions.set(conversationId, chat);
        }

        // Giới hạn tối đa 5 lượt hội thoại (user + model)
        if (chat.history.length > MAX_HISTORY * 2) {
            chat.history = chat.history.slice(-MAX_HISTORY * 2);
        }

        // Gửi message người dùng (không chèn facts)
        const response = await chat.sendMessage({ message: userMessage });

        return response.text;
    }
}

export default GeminiRepository;