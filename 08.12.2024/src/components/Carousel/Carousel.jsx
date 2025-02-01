import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="brand-carousel-container">
      <div className="brand-carousel-slides">
        <img
          src={require("../../Carousel_Logos/Samsung.svg").default}
          alt="Favorites"
        />
        <img
          src={require("../../Carousel_Logos/Apple.svg").default}
          alt="Favorites"
        />
        
        <img
          src={require("../../Carousel_Logos/Google.svg").default}
          alt="Favorites"
        />
        <img
          src={require("../../Carousel_Logos/Xiaomi.svg").default}
          alt="Favorites"
        />
        <img
          src={require("../../Carousel_Logos/Huawei.svg").default}
          alt="Favorites"
        />
        <img
          src={require("../../Carousel_Logos/Oppo.svg").default}
          alt="Favorites"
        />
        <img
          src={require("../../Carousel_Logos/Vivo.svg").default}
          alt="Favorites"
        />
        <img
          src={require("../../Carousel_Logos/Oneplus.svg").default}
          alt="Favorites"
        />
        <img
          src={require("../../Carousel_Logos/Nothing.svg").default}
          alt="Favorites"
        />
      </div>
    </div>
  );
};

export default Carousel;
