import React, { useState, useEffect, useCallback } from 'react';
import './ChatBox.css';

interface IMessage {
    user: 'human' | 'bot';
    text: string;
}

const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [input, setInput] = useState('');

    const fetchResponse = useCallback(async (input: string) => {
        return input;
    }, []);    

    const sendMessage = async () => {
        const userMessage: IMessage = { user: 'human', text: input };
        setMessages((messages) => [...messages, userMessage]);

        const botMessageText = await fetchResponse(input);
        const botMessage: IMessage = { user: 'bot', text: botMessageText };

        setMessages((messages) => [...messages, botMessage]);

        setInput('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chatbox">
            <div className="chat-history">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.user}`}>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
