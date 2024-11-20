import React, { useState } from 'react';
import Train2 from "../../assets/ADY5.png";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaCommentDots, FaTimes, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Hero = () => {
    const { t, i18n } = useTranslation();
    const [chatOpen, setChatOpen] = useState(false);
    const [questionsPanelOpen, setQuestionsPanelOpen] = useState(false); // Состояние панели вопросов
    const [messages, setMessages] = useState([
        { sender: 'bot', text: t("Hello! How can I help you today?") }
    ]);
    const [userMessage, setUserMessage] = useState('');

    // Список готовых вопросов
    const readyQuestions = [
        t("How to buy a train ticket?"),
        t("What are the available train routes?"),
        t("What is the refund policy for tickets?"),
        t("What are the seating options?"),
        t("Are pets allowed on trains?"),
        t("Can I change my seat after booking?"),
        t("What are the baggage restrictions?"),
        t("How can I contact support?")
    ];

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const imageVariants = {
        initial: {
            x: "100%",
            scale: 1,
        },
        animate: {
            x: "25%",
            scale: 0.9,
            transition: {
                duration: 3,
                ease: "easeInOut",
            }
        }
    };

    const handleSendMessage = (message) => {
        const text = message || userMessage; // Если есть готовый вопрос, берем его
        if (text.trim() === "") return;

        const newUserMessage = { sender: 'user', text };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setUserMessage(''); // Очищаем поле ввода

        // Генерация ответа от бота
        setTimeout(() => {
            const botReply = generateBotReply(text); // Динамический ответ от бота
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
        <div className='w-full h-[calc(100vh-8ch)] lg:px-28 md:px-16 sm:px-7 mt-[8ch] flex items-center justify-center flex-col hero relative'>
            <div className="flex-1 w-full flex flex-col lg:flex-row items-stretch justify-between gap-5 pb-5">
                <motion.div className="lg:w-[35%] w-full h-auto rounded-md flex justify-center flex-col space-y-8 lg:space-y-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'linear', delay: 0.2 }}
                >
                    <motion.div className="space-y-5"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'linear', delay: 0.4 }}
                    >
                        <motion.h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-neutral-50 leading-[1.15] text-center md:text-left"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2, ease: 'linear', delay: 0.4 }}
                        >
                            {t("reserve1")}
                            <span style={{ color: '#1d5c87' }} className="tracking-wider">
                                {t("reserve3")}
                            </span>
                        </motion.h1>
                        <motion.p className="text-sm sm:text-lg font-normal text-neutral-300 line-clamp-4 text-ellipsis text-center md:text-left"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2, ease: 'linear', delay: 0.6 }}
                        >
                            {t("text1")}
                        </motion.p>
                    </motion.div>

                    <Link to={'/train'}  style={{ background: '#1d5c87' }} className='w-fit text neutral-50 font-medium text-base px-6 py-3 rounded-md  text-white ease-in-out duration-300'>
                        {t("reserve2")}
                    </Link>
                </motion.div>

                <div className="lg:w-[70%] w-full h-full rounded-md flex items-end justify-end relative lg:static">
                    <motion.img className="w-full max-h-[60%] object-contain relative"
                        style={{ top: '-160px' }} 
                        src={Train2}
                        alt='train img'
                        initial="initial"
                        animate="animate"
                        variants={imageVariants}
                    />
                </div>
            </div>

            {/* Кнопка для открытия чата */}
            <div className="fixed bottom-10 right-10">
                <button onClick={() => setChatOpen(!chatOpen)} className="bg-[#1d5c87] p-4 rounded-full text-white shadow-lg">
                    <FaCommentDots size={30} />
                </button>
            </div>

            {/* Модальное окно чата */}
            {chatOpen && (
                <div className="fixed bottom-0 right-0 w-[400px] h-[500px] bg-white shadow-lg rounded-tl-lg">
                    <div className="p-4 border-b-2 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">{t("Chat with us")}</h3>
                        <button onClick={() => setChatOpen(false)} className="text-gray-500">
                            <FaTimes size={20} />
                        </button>
                    </div>
                    <div className="flex h-full">
                        {/* Панель вопросов */}
                        {questionsPanelOpen && (
                            <div className="w-[100px] h-full bg-gray-100 shadow-inner flex flex-col items-center p-2 overflow-y-auto max-h-full">
                                <button onClick={() => setQuestionsPanelOpen(false)} className="text-gray-700">
                                    <FaChevronLeft size={20} />
                                </button>
                                <div className="flex-1 mt-2 w-full">
                                    {readyQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSendMessage(question)}
                                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm shadow my-1 w-full"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Окно сообщений */}
                        <div className="flex-1 flex flex-col">
                            <div className="overflow-y-auto p-4 flex-1">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`mb-2 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                                        <div className={`p-2 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200' : 'bg-[#1d5c87] text-white'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t-2 flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder={t("Type a message...")}
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    className="bg-[#1d5c87] text-white py-2 px-4 rounded-lg"
                                >
                                    {t("Send")}
                                </button>
                            </div>
                        </div>
                        {/* Кнопка для открытия панели вопросов */}
                        {!questionsPanelOpen && (
                            <button
                                onClick={() => setQuestionsPanelOpen(true)}
                                className="w-[40px] h-full bg-gray-100 text-gray-700 flex items-center justify-center"
                            >
                                <FaChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
