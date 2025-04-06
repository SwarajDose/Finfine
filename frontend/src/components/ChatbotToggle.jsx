// src/components/ChatbotToggle.jsx
import React, { useState } from "react";
import "./ChatbotToggle.css";

const ChatbotToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isOpen && (
                <div className="chatbot-iframe-wrapper">
                    <iframe
                        src="https://www.chatbase.co/chatbot-iframe/IsLInmzFLBqUvD2bIoZLS"
                        width="100%"
                        style={{ height: "100%", minHeight: "500px" }}
                        frameBorder="0"
                        title="FinFlow Chatbot"
                    ></iframe>
                </div>
            )}

            <button className="chatbot-button" onClick={toggleChatbot}>
                💬
            </button>
        </>
    );
};

export default ChatbotToggle;
