import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatBoxRef = useRef(null);

    const sendMessage = async () => {
        if (input.trim() === "") return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage, { sender: "bot", text: "...", loading: true }]);

        try {
            const response = await axios.post("https://open-ai-yns3.onrender.com/chat", {
                message: input,
            });

            if (response.data && response.data.message) {
                setMessages((prev) =>
                    prev
                        .slice(0, -1)
                        .concat({ sender: "bot", text: response.data.message })
                );
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) =>
                prev
                    .slice(0, -1)
                    .concat({ sender: "bot", text: "Server is not working or Server is very busy :)" })
            );
        }

        setInput("");
    };

    useEffect(() => {
        chatBoxRef.current?.scrollTo({
            top: chatBoxRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2 className="chat-title">Chat bot</h2>
            </div>
            <div className="chat-box" ref={chatBoxRef}>
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
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Enter message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
