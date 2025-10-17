import ConversationService from "../../services/conversation.service.js";
import GeminiService from "../../services/gemini.service.js";
import MessageService from "../../services/message.service.js";

const messageEvent = (socket, io) => {

    // Khi client join vào room (mỗi conversation là 1 room)
    socket.on("join_room", (conversationId) => {
        if (socket.currentRoom) {
            socket.leave(socket.currentRoom); // rời room cũ (nếu có)
            console.log(`👋 User ${socket.id} left room ${socket.currentRoom}`);
        }

        socket.join(conversationId);
        socket.currentRoom = conversationId;
        console.log(`🟢 User ${socket.id} joined room ${conversationId}`);
    });

    // Khi client gửi tin nhắn
    socket.on("send_message", async (data) => {
        try {
            console.log("💬 Received message:", data);

            // 1️⃣ Lưu tin nhắn user
            await MessageService.createMessage({ ...data, sender: "user" });

            // 2️⃣ Lấy thông tin hội thoại
            const conversation = await ConversationService.getConversationById(data.conversationId);
            const messages = await MessageService.getMessages(data.conversationId);

            // 3️⃣ Tìm message AI gần nhất để trích facts
            const lastAiMessage = [...messages].reverse().find(m => m.sender === "system");
            if (lastAiMessage) {
                const newFacts = await GeminiService.extractFactsFromTurn(data.text, lastAiMessage.text);
                if (newFacts.length > 0) {
                    console.log("🧠 New facts extracted:", newFacts);
                    await ConversationService.updateFacts(data.conversationId, newFacts);
                }
            }

            // 4️⃣ Gọi AI sinh phản hồi mới
            const responseText = await GeminiService.generateFollowupQuestions(
                conversation.goal,
                data.text,
                conversation.facts,
                conversation.id
            );

            // 5️⃣ Lưu phản hồi AI vào DB
            await MessageService.createMessage({
                ...data,
                text: responseText,
                sender: "system"
            });

            // 6️⃣ Chỉ gửi tin nhắn cho những client trong cùng conversationId
            io.to(data.conversationId).emit("receive_message", {
                conversationId: data.conversationId,
                text: responseText,
                sender: "system"
            });

        } catch (error) {
            console.error("❌ Error in send_message:", error);
            socket.emit("error", { message: "Có lỗi xảy ra khi gửi tin nhắn." });
        }
    });

    // Khi ngắt kết nối
    socket.on("disconnect", () => {
        console.log(`🔴 User ${socket.id} disconnected`);
    });
};

export default messageEvent;
