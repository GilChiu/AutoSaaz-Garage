import { useState } from "react";
import "./LiveChat.css";
import Sidebar from "../Sidebar/Sidebar";
import supportAvatar from "../../assets/Student-Dashboard/Ellipse 62.png";
import userAvatar from "../../assets/Student-Dashboard/a-l-l-e-f-v-i-n-i-c-i-u-s-343875-unsplash.png";

const LiveChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "user",
      text: "Hello, I'm having trouble accessing the Commercial Real Estate course materials.",
      time: "02:30",
    },
    {
      sender: "support",
      text: "Hi! I can help you with that. Could you please specify which materials you're trying to access?",
      time: "02:45",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="chat-layout">
      <Sidebar />
      <div className="chat-wrapper">
        <h2 className="page-title">Get In Touch</h2>

        <div className="chat-card">
          <div className="chat-header">
            <h3>Live Chat Support</h3>
            <p>Connect with our support team</p>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender === "user" ? "user" : "support"}`}
              >
                <img
                  className="chat-avatar"
                  src={msg.sender === "user" ? userAvatar : supportAvatar}
                  alt={`${msg.sender} avatar`}
                />
                <div className="chat-bubble">
                  <p>{msg.text}</p>
                  <span>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
