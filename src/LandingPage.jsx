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

import irrigationImg from "./assets/directions/irrigation.png";
import agrometeoImg from "./assets/directions/agrometeo.png";
import dronesImg from "./assets/directions/drones.png";
import fintechImg from "./assets/directions/fintech.png";

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

const DIRECTION_ITEMS = [
  { key: "smartIrrigation", icon: "💧", img: irrigationImg },
  { key: "agrometeo", icon: "🌤️", img: agrometeoImg },
  { key: "drones", icon: "🛸", img: dronesImg },
  { key: "fintech", icon: "📱", img: fintechImg },
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

  const dirCarouselRef = React.useRef(null);
  const [activeDirIndex, setActiveDirIndex] = React.useState(2);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollDirections = (direction) => {
    if (dirCarouselRef.current) {
      const scrollAmount = direction === "left" ? -330 : 330;
      dirCarouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleDirScroll = () => {
    if (dirCarouselRef.current) {
      const { scrollLeft } = dirCarouselRef.current;
      const index = Math.round(scrollLeft / 330);
      setActiveDirIndex(
        Math.min(Math.max(index, 0), DIRECTION_ITEMS.length - 1),
      );
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

        <div className="directions-carousel-wrapper">
          <button
            type="button"
            className="carousel-arrow arrow-left"
            onClick={() => scrollDirections("left")}
            aria-label="Previous direction"
          >
            ‹
          </button>

          <div
            className="directions-carousel-track"
            ref={dirCarouselRef}
            onScroll={handleDirScroll}
          >
            {DIRECTION_ITEMS.map((item, idx) => {
              const dirData = t.directions[item.key] || {};
              const isCenter = idx === activeDirIndex;

              return (
                <div
                  key={item.key}
                  className={`direction-card ${isCenter ? "active" : ""}`}
                  onClick={() => {
                    if (dirCarouselRef.current) {
                      dirCarouselRef.current.scrollTo({
                        left: idx * 320,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  <div className="direction-card-img-wrap">
                    <img
                      src={item.img}
                      alt={dirData.title}
                      className="direction-card-img"
                    />
                    <div className="direction-icon-badge">{item.icon}</div>
                  </div>
                  <div className="direction-card-body">
                    <h3>{dirData.title}</h3>
                    <p>{dirData.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="carousel-arrow arrow-right"
            onClick={() => scrollDirections("right")}
            aria-label="Next direction"
          >
            ›
          </button>

          {/* Pagination Dots */}
          <div className="carousel-dots">
            {DIRECTION_ITEMS.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === activeDirIndex ? "active" : ""}`}
                onClick={() => {
                  if (dirCarouselRef.current) {
                    dirCarouselRef.current.scrollTo({
                      left: idx * 320,
                      behavior: "smooth",
                    });
                  }
                }}
              />
            ))}
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
