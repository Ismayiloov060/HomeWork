import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = ({ theme }) => {
  const { t } = useTranslation();
  const isDarkTheme = theme === 'dark';

  const styles = {
    container: {
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'transparent',
      marginTop: '70px',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      minHeight: 'calc(100vh - 70px)',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
      color: '#1d5c87',
      animation: 'fadeIn 1.5s ease-in-out',
    },
    section: {
      margin: '20px 0',
      lineHeight: '1.6',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 1)',
    },
    advantageContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    advantage: {
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    },
    advantageHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 1)',
    },
    advantageTitle: {
      fontSize: '1.5rem',
      margin: '0 0 10px 0',
      color: '#1d5c87',
    },
    advantageText: {
      margin: '0',
      lineHeight: '1.4',
    },
    trainTypeContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '30px',
    },
    trainTypeCard: {
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    },
    trainTypeHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 1)',
    },
    trainTypeTitle: {
      fontSize: '1.5rem',
      margin: '10px 0',
      color: '#1d5c87',
    },
    trainTypeDescription: {
      marginTop: '10px',
    },
  };

  const [hoveredAdvantage, setHoveredAdvantage] = useState(null);
  const [hoveredTrainType, setHoveredTrainType] = useState(null);

  return (
    <section style={styles.container}>
      <h1 style={styles.title}>{t("meet the trains")}</h1>
      <div style={styles.section}>
        <p>{t("text about1")}</p>
      </div>
      <h2 style={styles.title}>{t("why choose trains?")}</h2>
      <div style={styles.advantageContainer}>
        {['eco-friendliness', 'comfort', 'safety'].map((key, index) => (
          <div
            key={index}
            style={{
              ...styles.advantage,
              ...(hoveredAdvantage === index ? styles.advantageHover : {}),
            }}
            onMouseEnter={() => setHoveredAdvantage(index)}
            onMouseLeave={() => setHoveredAdvantage(null)}
          >
            <h3 style={styles.advantageTitle}>{t(key)}</h3>
            <p style={styles.advantageText}>{t(`text about${index + 2}`)}</p>
          </div>
        ))}
      </div>
      <h2 style={styles.title}>{t("types of trains")}</h2>
      <div style={styles.trainTypeContainer}>
        {[
          { title: t("apsheronskaya ring"), description: t("text about5") },
          { title: t("intercity trains"), description: t("text about6") },
          { title: t("high-speed trains"), description: t("text about7") },
        ].map((trainType, index) => (
          <div
            key={index}
            style={{
              ...styles.trainTypeCard,
              ...(hoveredTrainType === index ? styles.trainTypeHover : {}),
            }}
            onMouseEnter={() => setHoveredTrainType(index)}
            onMouseLeave={() => setHoveredTrainType(null)}
          >
            <h3 style={styles.trainTypeTitle}>{trainType.title}</h3>
            <p style={styles.trainTypeDescription}>{trainType.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;