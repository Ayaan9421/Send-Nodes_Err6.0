import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

export default function Chat({ userId, receiverId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/chat/messages?sender=${userId}&receiver=${receiverId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, receiverId]);

  const sendMessage = () => {
    const newMessage = { sender: userId, receiver: receiverId, message };

    socket.emit("sendMessage", {
      sender: "User1",  // ✅ Ensure sender is provided
      message: "Hello, this is a test message!"
  });
    axios.post("http://localhost:5000/chat/send", newMessage)
      .catch((err) => console.error(err));

    setMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender === userId ? "You" : "Them"}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
