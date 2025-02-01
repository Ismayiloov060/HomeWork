import React from "react";
import "./Home.css";
import Carousel from "../Carousel/Carousel";
import Stand from "../Stand/Stand";


import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <Stand />
      
      
      <Carousel />
      <Footer />
    </div>
  );
}
