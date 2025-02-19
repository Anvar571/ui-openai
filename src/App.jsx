import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (input.trim() === "") return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post("http://localhost:5000/chat", {
                message: input,
            });

            const botMessage = { sender: "bot", text: response.data.reply };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Enter message..."
                />
                <button onClick={sendMessage}>Yuborish</button>
            </div>
        </div>
    );
}

export default App;
