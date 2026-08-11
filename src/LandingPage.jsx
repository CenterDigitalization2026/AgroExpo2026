import React from "react";
import RegistrationForm from "./RegistrationForm";
import LanguageSelector from "./components/LanguageSelector";
import { useLanguage } from "./i18n/LanguageContext";
import logoImg from "./assets/logo-photo.png";
import moaLogo from "./assets/partners/MoA.png";
import wfpLogo from "./assets/partners/WFP.png";
import faoLogo from "./assets/partners/FAO.png";
import worldBankLogo from "./assets/partners/WORLD BANK.png";
import koicaLogo from "./assets/partners/KOICA.png";
import EmblemOfTJK from "./assets/partners/EmblemTJK.png";
import CenterForDigital from "./assets/partners/CenterForDigital.png";

import "./LandingPage.css";

const PARTNER_LOGOS = [
  EmblemOfTJK,
  moaLogo,
  CenterForDigital,
  koicaLogo,
  wfpLogo,
  faoLogo,
  worldBankLogo,
];

const LandingPage = () => {
  const { t } = useLanguage();
  const carouselRef = React.useRef(null);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollLeft = 0;
        } else {
          carouselRef.current.scrollBy({ left: 1, behavior: "auto" });
        }
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToRegistration = () => {
    const regSection = document.getElementById("registration");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div
          className="logo-container"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src={logoImg}
            alt="Digital AgroExpo Tajikistan-2026"
            className="navbar-logo-img"
          />
          <div className="logo-text">
            Digital AgroExpo
            <span>Tajikistan-2026</span>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#about">{t.nav.about}</a>
          </li>
          <li>
            <a href="#directions">{t.nav.directions}</a>
          </li>
          <li>
            <a href="#partners">{t.nav.partners}</a>
          </li>
        </ul>

        <div className="nav-actions">
          <LanguageSelector />
          <button className="btn-nav" onClick={scrollToRegistration}>
            {t.nav.registerBtn}
          </button>
        </div>
      </nav>

      <header className="hero" id="about">
        <div className="hero-logo-container">
          <img
            src={logoImg}
            alt="Digital AgroExpo Logo"
            className="hero-logo-img"
          />
        </div>
        <span className="hero-badge">{t.hero.badge}</span>
        <h1>{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>

        <div className="hero-info-cards">
          <div className="info-card">{t.hero.location}</div>
          <div className="info-card">{t.hero.date}</div>
          <div className="info-card">{t.hero.format}</div>
        </div>

        <button className="btn-hero" onClick={scrollToRegistration}>
          {t.hero.cta}
        </button>
      </header>

      <section className="section" id="directions">
        <div className="section-title">
          <h2>{t.directions.title}</h2>
          <p>{t.directions.subtitle}</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💧</div>
            <h3>{t.directions.smartIrrigation.title}</h3>
            <p>{t.directions.smartIrrigation.desc}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌤️</div>
            <h3>{t.directions.agrometeo.title}</h3>
            <p>{t.directions.agrometeo.desc}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛸</div>
            <h3>{t.directions.drones.title}</h3>
            <p>{t.directions.drones.desc}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>{t.directions.fintech.title}</h3>
            <p>{t.directions.fintech.desc}</p>
          </div>
        </div>
      </section>

      <section className="section registration-section" id="registration">
        <div className="section-title">
          <h2>{t.registration.title}</h2>
          <p>{t.registration.subtitle}</p>
        </div>

        <RegistrationForm />
      </section>

      <section className="section partners-section" id="partners">
        <div className="section-title">
          <h2>{t.partners.title}</h2>
          <p>{t.partners.subtitle}</p>
        </div>

        <div className="partners-carousel-wrapper">
          <button
            type="button"
            className="carousel-arrow arrow-left"
            onClick={() => scrollCarousel("left")}
            aria-label="Previous partners"
          >
            ‹
          </button>

          <div
            className="partners-carousel-track"
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {t.partners.items.concat(t.partners.items).map((partner, idx) => {
              const originalIdx = idx % t.partners.items.length;
              const isObj = typeof partner === "object" && partner !== null;
              const name = isObj ? partner.name : partner;
              const logo = isObj
                ? partner.logo
                : PARTNER_LOGOS[originalIdx] || null;

              return (
                <div key={idx} className="partner-card" title={name}>
                  {logo ? (
                    <img src={logo} alt={name} className="partner-logo-img" />
                  ) : (
                    <span className="partner-name">{name}</span>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="carousel-arrow arrow-right"
            onClick={() => scrollCarousel("right")}
            aria-label="Next partners"
          >
            ›
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo-wrap">
          <img
            src={logoImg}
            alt="Digital AgroExpo Tajikistan-2026"
            className="footer-logo-img"
          />
        </div>
        <div className="footer-content">
          <p>{t.footer.text}</p>
          <p>{t.footer.location}</p>
        </div>
        <div className="footer-bottom">{t.footer.copyright}</div>
      </footer>
    </div>
  );
};

export default LandingPage;
