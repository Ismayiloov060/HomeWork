import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaTimes, FaChevronLeft } from "react-icons/fa";

const Chat = ({ closeChat }) => {
  const [messages, setMessages] = useState([
    { text: "I'm here to help! Select a question below or type your query.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [questionsPanelOpen, setQuestionsPanelOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState("fixed"); 

  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const tableRef = useRef(null);

  const readyQuestions = [
    "How to buy a train ticket?",
    "What are the available train routes?",
    "What is the refund policy for tickets?",
    "What are the seating options on the train?",
    "How can I track my train ticket?",
    "Can I reserve a seat for my luggage?",
    "What are the payment options?",
    "Can I use my ticket on any other train?",
    "How do I get a refund?",
  ];

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botReply = generateBotReply(message);
      setMessages((prev) => [...prev, botReply]);
    }, 500);
  };

  const generateBotReply = (message) => {
    return { text: "I'm here to help! Can you clarify your question?", sender: "bot" };
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuestionSelect = (question) => {
    handleSendMessage(question);
    setQuestionsPanelOpen(false);
  };


  const handleScroll = () => {
    if (tableRef.current) {
      const tablePosition = tableRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      
      if (tablePosition <= windowHeight && tablePosition >= 0) {
        setChatPosition("absolute"); 
      } else {
        setChatPosition("fixed");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      ref={chatRef}
      className={`w-[400px] h-[500px] bg-gradient-to-t from-white to-blue-100 shadow-lg rounded-tl-lg flex flex-col transition-all duration-300 ${
        chatPosition === "absolute" ? "absolute top-[calc(100vh-500px)]" : "fixed bottom-0"
      } right-0`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-tl-lg">
        <h3 className="font-semibold">Chat with us</h3>
        <button onClick={closeChat} className="text-gray-300 hover:text-white">
          <FaTimes size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-blue-50">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block p-3 rounded-lg text-white ${msg.sender === "user" ? "bg-blue-500" : "bg-gray-300 text-black"}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t flex flex-col gap-2 bg-white">
        <button
          onClick={() => setQuestionsPanelOpen(!questionsPanelOpen)}
          className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm shadow-md transition ease-in-out hover:bg-blue-200 mb-3"
        >
          {questionsPanelOpen ? <FaChevronLeft /> : "Select a question"}
        </button>

        {questionsPanelOpen && (
          <div className="flex flex-wrap gap-2 overflow-auto max-h-[150px] mb-3">
            {readyQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionSelect(question)}
                className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm shadow-md transition ease-in-out hover:bg-blue-200"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border p-2 rounded-lg"
          />
          <button
            onClick={() => {
              handleSendMessage(input);
              setInput("");
            }}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
