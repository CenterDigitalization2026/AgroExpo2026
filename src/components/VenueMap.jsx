import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import "./VenueMap.css";

const venueTranslations = {
  tg: {
    sectionTag: "Макон ва инфрасохтор",
    title: "Макон ва Харита",
    subtitle: "Баргузории конфронс ва намоишгоҳи Digital AgriExpo Tajikistan-2026 дар меҳмонхонаи муосири пойтахт",
    venueName: "Меҳмонхонаи «Hyatt Regency Dushanbe»",
    address: "Ҷумҳурии Тоҷикистон, ш. Душанбе, хиёбони Исмоили Сомонӣ 26/1",
    datesLabel: "Санаи баргузорӣ:",
    datesValue: "3 – 4 декабри соли 2026",
    timeLabel: "Вақти корӣ:",
    timeValue: "08:30 – 17:30",
    hallsLabel: "Минтақаҳо:",
    hallsValue: "Толори калони байналмилалӣ ва 6 минтақаи намоиши AgTech",
    btnYandexMaps: "Яндекс Харита",
    btnNavigator: "Хатсайр дар Навигатор",
    landmarkTitle: "Маълумоти иловагӣ ва роҳнамо",
    landmarkDesc: "Меҳмонхона дар маркази шаҳри Душанбе, дар соҳили кӯли «Ҷавонон» (Комсомол) ва назди маҷмааи «Кохи Наврӯз» воқеъ буда, дорои таваққуфгоҳи васеъ ва дастрасии осони нақлиётӣ мебошад.",
  },
  ru: {
    sectionTag: "Локация и инфраструктура",
    title: "Место проведения и Карта",
    subtitle: "Проведение выставки и конференции Digital AgriExpo Tajikistan-2026 в премиальном гостиничном комплексе столицы",
    venueName: "Отель «Hyatt Regency Dushanbe»",
    address: "Республика Таджикистан, г. Душанбе, проспект Исмоили Сомони 26/1",
    datesLabel: "Даты проведения:",
    datesValue: "3 – 4 декабря 2026 г.",
    timeLabel: "Время работы:",
    timeValue: "08:30 – 17:30",
    hallsLabel: "Зоны экспозиции:",
    hallsValue: "Главный конференц-зал и 6 интерактивных технологических зон",
    btnYandexMaps: "Яндекс Карты",
    btnNavigator: "Маршрут в Навигаторе",
    landmarkTitle: "Ориентиры и транспортная доступность",
    landmarkDesc: "Отель расположен в центре Душанбе на берегу озера Джавонон (Комсомольское), рядом с комплексом «Кохи Навруз». Предусмотрена просторная парковка и удобный подъезд с проспекта Исмоили Сомони.",
  },
  en: {
    sectionTag: "Venue & Infrastructure",
    title: "Venue & Interactive Map",
    subtitle: "Hosting Digital AgriExpo Tajikistan-2026 at the premier international hotel and convention venue in Dushanbe",
    venueName: "Hyatt Regency Dushanbe Hotel",
    address: "26/1 Ismoili Somoni Avenue, Dushanbe, Republic of Tajikistan",
    datesLabel: "Event Dates:",
    datesValue: "December 3 – 4, 2026",
    timeLabel: "Working Hours:",
    timeValue: "08:30 – 17:30 (GMT+5)",
    hallsLabel: "Exhibition Areas:",
    hallsValue: "Grand Ballroom Conference Center & 6 Interactive AgTech Demo Zones",
    btnYandexMaps: "Open in Yandex Maps",
    btnNavigator: "Route in Navigator",
    landmarkTitle: "Directions & Accessibility",
    landmarkDesc: "Centrally situated along Lake Javonon (Komsomol Lake), adjacent to the iconic Kokhi Navruz complex. Offers ample parking and convenient access from Ismoili Somoni Avenue.",
  },
};

venueTranslations.tj = venueTranslations.tg;

const VenueMap = ({ currentLang }) => {
  const { language } = useLanguage();
  const activeLang = currentLang || language || "tj";
  const normalizedLang =
    activeLang === "tj" || activeLang === "tg"
      ? "tg"
      : activeLang === "en"
      ? "en"
      : "ru";

  const t = venueTranslations[normalizedLang] || venueTranslations.tg;

  const yandexMapsUrl =
    "https://yandex.tj/maps/10318/dushanbe/?ll=68.766959%2C38.582420&mode=poi&poi%5Bpoint%5D=68.766959%2C38.582420&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1550128506&z=17.5";
  const yandexNavUrl =
    "https://yandex.ru/maps/?rtext=~38.582420,68.766959&rtt=auto";

  return (
    <section className="section venue-section" id="location">
      <div className="section-title">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      <div className="venue-container">
        {/* Venue Info Card */}
        <div className="venue-card">
          <div className="venue-card-header">
            <div className="venue-icon-box" aria-hidden="true">
              📍
            </div>
            <div>
              <h3 className="venue-name">{t.venueName}</h3>
              <p className="venue-address">{t.address}</p>
            </div>
          </div>

          <div className="venue-details-grid">
            <div className="venue-detail-item">
              <span className="detail-icon">📅</span>
              <div>
                <span className="detail-label">{t.datesLabel}</span>
                <strong className="detail-value">{t.datesValue}</strong>
              </div>
            </div>

            <div className="venue-detail-item">
              <span className="detail-icon">⏰</span>
              <div>
                <span className="detail-label">{t.timeLabel}</span>
                <strong className="detail-value">{t.timeValue}</strong>
              </div>
            </div>

            <div className="venue-detail-item">
              <span className="detail-icon">🏛️</span>
              <div>
                <span className="detail-label">{t.hallsLabel}</span>
                <strong className="detail-value">{t.hallsValue}</strong>
              </div>
            </div>

            <div className="venue-detail-item">
              <span className="detail-icon">💡</span>
              <div>
                <span className="detail-label">{t.landmarkTitle}</span>
                <p className="detail-desc">{t.landmarkDesc}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="venue-actions">
            <a
              href={yandexMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="venue-btn venue-btn-primary"
            >
              <span className="btn-icon">🗺️</span>
              {t.btnYandexMaps}
            </a>
            <a
              href={yandexNavUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="venue-btn venue-btn-secondary"
            >
              <span className="btn-icon">🧭</span>
              {t.btnNavigator}
            </a>
          </div>
        </div>

        {/* Interactive Yandex Map Embed */}
        <div className="venue-map-wrapper">
          <div className="map-frame-container">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=68.766959%2C38.582420&z=17.5&pt=68.766959,38.582420,pm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="Hyatt Regency Dushanbe Location on Yandex Maps"
              className="yandex-map-iframe"
              loading="lazy"
            />
          </div>
          <div className="map-overlay-badge">
            <span className="badge-dot" />
            <span>Hyatt Regency Dushanbe • Expo Hall</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueMap;
