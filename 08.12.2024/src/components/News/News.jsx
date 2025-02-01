import React from 'react';
import './News.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const News = () => {
  return (
   
    <div className="news-container">
        <Header />
      <h1 className="news-title">Новости</h1>
      <div className="news-item">
        <h2 className="news-item-title">Новость 1</h2>
        <p className="news-item-date">28 июля 2024</p>
        <p className="news-item-text">
          Сегодня мы запускаем новую функцию на нашем сайте! Она позволит пользователям легче находить интересующий их контент и получать обновления в режиме реального времени.
        </p>
      </div>
      <div className="news-item">
        <h2 className="news-item-title">Новость 2</h2>
        <p className="news-item-date">25 июля 2024</p>
        <p className="news-item-text">
          Наша команда разработчиков выпустила обновление, которое значительно улучшает производительность нашего приложения. Теперь оно работает быстрее и стабильнее.
        </p>
      </div>
      <div className="news-item">
        <h2 className="news-item-title">Новость 3</h2>
        <p className="news-item-date">20 июля 2024</p>
        <p className="news-item-text">
          Мы рады объявить о партнерстве с ведущей технологической компанией. Это сотрудничество откроет новые возможности для обоих партнеров и наших пользователей.
        </p>
      </div>
      <Footer />
    </div>
    
  );
};

export default News;
