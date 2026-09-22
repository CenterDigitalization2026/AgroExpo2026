import React from "react";
import RegistrationForm from "./RegistrationForm";
import LanguageSelector from "./components/LanguageSelector";
import ProgramSection from "./components/ProgramSection";
import VenueMap from "./components/VenueMap";
import { useLanguage } from "./i18n/LanguageContext";
import logoImg from "./assets/logo-500.png";
import moaLogo from "./assets/partners/MoA.png";
import wfpLogo from "./assets/partners/WFP.png";
import koicaLogo from "./assets/partners/KOICA.png";
import EmblemOfTJK from "./assets/partners/EmblemTJK.png";
import CenterForDigital from "./assets/partners/CenterForDigital.png";

import irrigationImg from "./assets/directions/irrigation.png";
import agrometeoImg from "./assets/directions/agrometeo.png";
import greenhouseImg from "./assets/directions/greenhouse.png";
import dronesImg from "./assets/directions/drones.png";
import consultingImg from "./assets/directions/fintech.png";
import marketplaceImg from "./assets/directions/marketplace.png";

import "./LandingPage.css";

const PARTNER_LOGOS = [
  EmblemOfTJK,
  moaLogo,
  CenterForDigital,
  koicaLogo,
  wfpLogo,
];

const DIRECTION_ITEMS = [
  { key: "smartIrrigation", icon: "💧", img: irrigationImg },
  { key: "agrometeo", icon: "🌤️", img: agrometeoImg },
  { key: "smartGreenhouse", icon: "🏡", img: greenhouseImg },
  { key: "drones", icon: "🛸", img: dronesImg },
  { key: "agroconsulting", icon: "📱", img: consultingImg },
  { key: "marketplace", icon: "🛒", img: marketplaceImg },
];

const LandingPage = () => {
  const { language, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

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
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            closeMobileMenu();
          }}
        >
          <img
            src={logoImg}
            alt="Digital AgriExpo Tajikistan-2026"
            className="navbar-logo-img"
          />
          <div className="logo-text">
            Digital AgriExpo
            <span>Tajikistan-2026</span>
          </div>
        </div>

        <ul className="nav-links desktop-only">
          <li>
            <a href="#about">{t.nav.about}</a>
          </li>
          <li>
            <a href="#directions">{t.nav.directions}</a>
          </li>
          <li>
            <a href="#program">{t.nav.program || "Программа"}</a>
          </li>
          <li>
            <a href="#location">{t.nav.location || "Локация"}</a>
          </li>
          <li>
            <a href="#partners">{t.nav.partners}</a>
          </li>
        </ul>

        <div className="nav-actions desktop-only">
          <LanguageSelector />
          <button className="btn-nav" onClick={scrollToRegistration}>
            {t.nav.registerBtn}
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="mobile-nav-toggle">
          <LanguageSelector />
          <button
            type="button"
            className={`hamburger-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-drawer-menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      />
      <div
        id="mobile-drawer-menu"
        className={`mobile-drawer ${mobileMenuOpen ? "active" : ""}`}
      >
        <div className="mobile-drawer-header">
          <div className="logo-text">
            Digital AgriExpo
            <span>Tajikistan-2026</span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <ul className="mobile-drawer-links">
          <li>
            <a href="#about" onClick={closeMobileMenu}>
              {t.nav.about}
            </a>
          </li>
          <li>
            <a href="#directions" onClick={closeMobileMenu}>
              {t.nav.directions}
            </a>
          </li>
          <li>
            <a href="#program" onClick={closeMobileMenu}>
              {t.nav.program || "Программа"}
            </a>
          </li>
          <li>
            <a href="#location" onClick={closeMobileMenu}>
              {t.nav.location || "Локация"}
            </a>
          </li>
          <li>
            <a href="#partners" onClick={closeMobileMenu}>
              {t.nav.partners}
            </a>
          </li>
        </ul>
        <div className="mobile-drawer-footer">
          <button
            className="btn-nav btn-drawer-nav"
            onClick={() => {
              scrollToRegistration();
              closeMobileMenu();
            }}
          >
            {t.nav.registerBtn}
          </button>
        </div>
      </div>

      <header className="hero" id="about">
        <div className="hero-logo-container">
          <img
            src={logoImg}
            alt="Digital AgriExpo Logo"
            className="hero-logo-img"
          />
        </div>
        <span className="hero-badge" style={{ whiteSpace: "pre-line" }}>
          {t.hero.badge}
        </span>
        <h1>{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>

        <div className="hero-info-cards">
          <a
            href="#location"
            className="info-card info-card-link"
            title="Макон ва Харита / Посмотреть на карте"
          >
            <span>{t.hero.location}</span>
            <span className="info-card-arrow" aria-hidden="true">↗</span>
          </a>
          <a
            href="#program"
            className="info-card info-card-link"
            title="Барномаи Форум / Программа мероприятий"
          >
            <span>{t.hero.date}</span>
            <span className="info-card-arrow" aria-hidden="true">↗</span>
          </a>
          <a
            href="#directions"
            className="info-card info-card-link"
            title="Самтҳои асосӣ / Направления выставки"
          >
            <span>{t.hero.format}</span>
            <span className="info-card-arrow" aria-hidden="true">↗</span>
          </a>
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

        <div className="directions-panorama-container">
          <div className="directions-panorama-grid">
            {DIRECTION_ITEMS.map((item, idx) => {
              const dirData = t.directions[item.key] || {};
              return (
                <div
                  key={item.key}
                  className={`panorama-card-wrapper wrapper-pos-${idx}`}
                >
                  <div className="panorama-card">
                    <img
                      src={item.img}
                      alt={dirData.title}
                      className="panorama-card-img"
                    />
                    <span className="card-top-tag">AgTech 0{idx + 1}</span>
                    <div className="panorama-card-overlay">
                      <div className="panorama-icon-badge">{item.icon}</div>
                      <h3>{dirData.title}</h3>
                      <p>{dirData.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Section */}
      <ProgramSection currentLang={language} />

      {/* Venue & Map Section */}
      <VenueMap currentLang={language} />

      <section className="section registration-section" id="registration">
        <div className="section-title">
          <h2>{t.registration.title}</h2>
          <p>{t.registration.subtitle}</p>
        </div>

        <RegistrationForm />
      </section>

      <section className="section partners-section" id="partners">
        <div className="partners-strip-container">
          <div className="partners-strip-header">
            <h3>{t.partners.title}</h3>
            <span className="partners-strip-subtitle">
              {t.partners.subtitle}
            </span>
          </div>

          <div className="partners-logos-strip">
            {t.partners.items.map((partner, idx) => {
              const isObj = typeof partner === "object" && partner !== null;
              const name = isObj ? partner.name : partner;
              const logo = isObj ? partner.logo : PARTNER_LOGOS[idx] || null;

              return (
                <div key={idx} className="partner-strip-item" title={name}>
                  {logo ? (
                    <img src={logo} alt={name} className="partner-strip-logo" />
                  ) : (
                    <span className="partner-strip-name">{name}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo-wrap">
          <img
            src={logoImg}
            alt="Digital AgriExpo Tajikistan-2026"
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
