import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: String, enum: ["user", "system"], required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ["text", "image", "file"], default: "text" },
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
