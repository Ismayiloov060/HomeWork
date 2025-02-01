import React, { useState } from "react";
import "./List.css";
import phones from "../../Phones";
import { Link } from "react-router-dom";
 

export default function List() {
  return (
    <div className="list-container">
      <div className="phones-list">
        {phones.map((phone) => (
          <div key={phone.id} className="card">
            <Link to={`/product/${phone.title}`}>
              <img
                src={require(`../../Phones_Picture/${phone.title}.jpg`)}
                alt={phone.name}
              />
            </Link>
            <Link to={`/product/${phone.title}`}>
              <div className="card-information">
                <p className="card-brand">{phone.name}</p>
                <p className="card-price">{phone.price}$</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
