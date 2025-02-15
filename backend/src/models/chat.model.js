import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true }, // Who sent the message
    message: { type: String, required: true }, // The actual message
    timestamp: { type: Date, default: Date.now }, // Auto-generate timestamp
  },
  { collection: "chats" }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
