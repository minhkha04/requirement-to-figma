import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    goal: { type: String, default: "" },
    messageCount: { type: Number, default: 0 },
    facts: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema);