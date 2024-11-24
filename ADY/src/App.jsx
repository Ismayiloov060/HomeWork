import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Train from './components/train/Train';
import Detail from './components/detail/Detail';
import Checkout from './components/checkout/Checkout';
import About from './components/about/About';
import ChatBot from './components/chatbot/ChatBot';
import Category from './components/category/Category';
import { TripProvider } from './context/TripContext'; 
import Dashboard from './components/dashboard/DashBoard';
import Ticket from './components/ticket/Ticket';
import Register from './components/register/Register'; 
import Login from './components/login/Login'; 

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    
    const firstVisit = localStorage.getItem('firstVisit');
    
    if (!firstVisit) {
      
      setIsFirstVisit(true);
      localStorage.setItem('firstVisit', 'false'); 
    }
  }, []);

  const openLogin = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const openRegister = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
  };

  return (
    <TripProvider>
      <Router>
        <div className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden'>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/train" element={<Train />} />
            <Route path="/detail/:tripType" element={<Detail />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/category" element={<Category />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ticket" element={<Ticket />} />
          </Routes>

          
          {isFirstVisit && registerOpen && (
            <Register onClose={closeRegister} openLogin={openLogin} />
          )}

          {loginOpen && <Login onClose={closeLogin} openRegister={openRegister} onLoginSuccess={() => setLoginOpen(false)} />}
          
          <ChatBot />
          <Footer />
        </div>
      </Router>
    </TripProvider>
  );
}

export default App;
