import React, {useState, useEffect} from "react";
import "./Catalog.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import phones from "../../Phones";
import Filter from "../Filter/Filter";
import List from "../List/List";

export default function Catalog() {
    
  

  
  return (
    <div className="catalog-container">
      <Header />
      <div className="filter-list-container">
        <Filter/>
        <List/>
      </div>
 
      <Footer />
    </div>
  );
}
