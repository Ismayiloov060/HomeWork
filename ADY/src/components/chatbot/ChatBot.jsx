import React, { useState } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ChatBot = () => {
    const { t } = useTranslation();
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: t('Hello! How can I assist you today?') }
    ]);

    const readyQuestions = [
        t('How to buy a train ticket?'),
        t('What are the available train routes?'),
        t('What is the refund policy for tickets?'),
        t('What are the seating options?'),
        t('Are pets allowed on trains?'),
        t('Can I change my seat after booking?'),
        t('What are the baggage restrictions?'),
        t('How can I contact support?')
    ];

    const handleQuestionClick = (question) => {
        const newUserMessage = { sender: 'user', text: question };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);

        setTimeout(() => {
            const botReply = generateBotReply(question);
            setMessages((prevMessages) => [...prevMessages, botReply]);
        }, 1000);
    };

    const generateBotReply = (message) => {
        if (message.toLowerCase().includes('how to buy')) {
            return { sender: 'bot', text: t("You can buy tickets on our website or at the station.") };
        }
        if (message.toLowerCase().includes('available train routes')) {
            return { sender: 'bot', text: t("Current routes include Baku, Ganja, Sumgait, and more.") };
        }
        if (message.toLowerCase().includes('refund policy')) {
            return { sender: 'bot', text: t("Tickets are refundable up to 24 hours before departure.") };
        }
        if (message.toLowerCase().includes('seating options')) {
            return { sender: 'bot', text: t("We offer Economy, Business, and First-Class seating.") };
        }
        if (message.toLowerCase().includes('pets allowed')) {
            return { sender: 'bot', text: t("Pets are allowed in specific compartments with prior booking.") };
        }
        if (message.toLowerCase().includes('baggage restrictions')) {
            return { sender: 'bot', text: t("Each passenger can carry up to 30 kg of baggage for free.") };
        }
        if (message.toLowerCase().includes('contact support')) {
            return { sender: 'bot', text: t("You can contact support via email or our hotline.") };
        }
        return { sender: 'bot', text: t("I'm here to help! Can you clarify your question?") };
    };

    return (
        <>
   
            <motion.div
                className="fixed bottom-5 right-5 z-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
            >
                {!chatOpen && (
                    <button
                        onClick={() => setChatOpen(true)}
                        className="bg-[#1d5c87] p-4 rounded-full text-white shadow-lg"
                    >
                        <FaCommentDots size={30} />
                    </button>
                )}
            </motion.div>

           
            {chatOpen && (
                <motion.div
                    className="fixed bottom-[5rem] right-5 w-[400px] h-[400px] bg-white dark:bg-black  shadow-lg rounded-lg z-50"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="p-4 border-b flex justify-between items-center bg-[#1d5c87]  text-white rounded-t-lg">
                        <h3 className="font-semibold text-lg">{t('Chat with us')}</h3>
                        <button
                            onClick={() => setChatOpen(false)}
                            className="text-gray-300 hover:text-white"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col h-full">
                 
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 dark:bg-black">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}
                                >
                                    <div
                                        className={`p-2 rounded-lg ${
                                            msg.sender === 'bot'
                                                ? 'bg-gray-200 text-gray-700'
                                                : 'bg-[#1d5c87] text-white'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        
                        <div className="p-4 bg-[#f4f4f4] dark:bg-black space-y-2 overflow-y-auto max-h-[20vh] rounded-lg">
                            {readyQuestions.map((question, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleQuestionClick(question)}
                                    className="bg-[#1d5c87] text-white px-4 py-2 rounded-lg w-full text-left"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {question}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default ChatBot;
