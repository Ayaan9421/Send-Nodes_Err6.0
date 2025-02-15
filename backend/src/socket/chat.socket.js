import { Server } from "socket.io";
import Chat from "../models/chat.model.js";

export function initSocket(server) {
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("🟢 New user connected");

        // Listen for new messages
        socket.on("sendMessage", async (data) => {
            console.log("Received message data:", data); // ✅ Check if sender & message are received
        
            const { sender, message } = data;
        
            if (!sender || !message) {
                console.error("❌ Sender or message is missing!");
                return;
            }
        
            try {
                const newChat = new Chat({ sender, message });
                await newChat.save();
                io.emit("receiveMessage", data);
            } catch (error) {
                console.error("❌ Error saving chat:", error);
            }
        });
        

        socket.on("disconnect", () => console.log("🔴 User disconnected"));
    });

    return io;
}