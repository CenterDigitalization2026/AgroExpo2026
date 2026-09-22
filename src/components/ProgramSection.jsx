import React, { useState } from "react";
import { programData } from "../data/programData";
import { useLanguage } from "../i18n/LanguageContext";
import "./ProgramSection.css";

const getCategoryIcon = (type) => {
  switch (type) {
    case "welcome":
      return "☕";
    case "ceremony":
      return "✨";
    case "plenary":
      return "🎙️";
    case "lunch":
      return "🍽️";
    case "panel":
      return "💬";
    case "networking":
      return "🤝";
    case "resolution":
      return "📜";
    case "tour":
      return "🚀";
    case "workshop":
      return "🌱";
    case "b2b":
      return "💼";
    default:
      return "📌";
  }
};

const ProgramSection = ({ currentLang }) => {
  const { language } = useLanguage();
  const activeLang = currentLang || language || "tj";
  const normalizedLang =
    activeLang === "tj" || activeLang === "tg"
      ? "tg"
      : activeLang === "en"
      ? "en"
      : "ru";

  const data = programData[normalizedLang] || programData.tg;
  const [activeDayId, setActiveDayId] = useState(1);

  const currentDay =
    data.days.find((d) => d.id === activeDayId) || data.days[0];

  return (
    <section className="section program-section" id="program">
      <div className="section-title">
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </div>

      <div className="program-container">
        {/* Day Tabs */}
        <div className="program-tabs-wrapper" role="tablist" aria-label="Program days">
          {data.days.map((day) => {
            const isActive = day.id === activeDayId;
            return (
              <button
                key={day.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                className={`program-day-tab ${isActive ? "active" : ""}`}
                onClick={() => setActiveDayId(day.id)}
              >
                <span className="tab-date-icon">📅</span>
                <span className="tab-label">{day.label}</span>
                {isActive && <span className="tab-active-indicator" />}
              </button>
            );
          })}
        </div>

        {/* Current Day Header Card */}
        <div className="day-summary-card">
          <div className="day-summary-info">
            <span className="day-date-pill">{currentDay.date}</span>
            <h3 className="day-summary-badge">{currentDay.badge}</h3>
          </div>
          <div className="day-sessions-count">
            <span>{currentDay.schedule.length}</span>
            <small>
              {normalizedLang === "en"
                ? "Sessions"
                : normalizedLang === "ru"
                ? "Мероприятий"
                : "Чорабинӣ"}
            </small>
          </div>
        </div>

        {/* Timeline Schedule */}
        <div className="program-timeline">
          {currentDay.schedule.map((item, idx) => {
            const icon = getCategoryIcon(item.type);
            return (
              <div key={idx} className="timeline-item">
                <div className="timeline-time-col">
                  <div className="time-pill">
                    <span className="clock-icon">🕒</span>
                    <span>{item.time}</span>
                  </div>
                </div>

                <div className="timeline-node">
                  <div className="timeline-dot" aria-hidden="true">
                    <span>{icon}</span>
                  </div>
                  {idx < currentDay.schedule.length - 1 && (
                    <div className="timeline-line" />
                  )}
                </div>

                <div className="timeline-content-card">
                  <div className="timeline-header">
                    <span className={`category-tag category-${item.type}`}>
                      {item.category}
                    </span>
                  </div>
                  <h4 className="timeline-title">{item.title}</h4>
                  {item.description && (
                    <p className="timeline-description">{item.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
