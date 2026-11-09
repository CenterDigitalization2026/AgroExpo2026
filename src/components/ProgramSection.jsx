import React, { useState } from "react";
import {
  Coffee,
  Award,
  Mic,
  Utensils,
  MessagesSquare,
  Handshake,
  FileText,
  Compass,
  Sprout,
  Briefcase,
  Bookmark,
  Calendar,
  Clock,
  Building2,
} from "lucide-react";
import { programData } from "../data/programData";
import { useLanguage } from "../i18n/LanguageContext";
import "./ProgramSection.css";

const getCategoryIcon = (type) => {
  switch (type) {
    case "welcome":
      return <Coffee size={18} />;
    case "ceremony":
      return <Award size={18} />;
    case "plenary":
      return <Mic size={18} />;
    case "lunch":
      return <Utensils size={18} />;
    case "panel":
      return <MessagesSquare size={18} />;
    case "networking":
      return <Handshake size={18} />;
    case "resolution":
      return <FileText size={18} />;
    case "tour":
      return <Compass size={18} />;
    case "workshop":
      return <Sprout size={18} />;
    case "b2b":
      return <Briefcase size={18} />;
    default:
      return <Bookmark size={18} />;
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
        {/* Exhibition Zone Banner (Open throughout both days) */}
        {data.exhibition && (
          <div className="exhibition-zone-banner">
            <div className="exhibition-banner-header">
              <span className="exhibition-badge-pill">
                <Building2 size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                {data.exhibition.title}
              </span>
              <span className="exhibition-duration-badge">
                <Calendar size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
                {normalizedLang === "en" ? "Both Days: Dec 3–4" : normalizedLang === "ru" ? "Оба дня: 3–4 декабря" : "Ҳар ду рӯз: 3–4 декабр"}
              </span>
            </div>
            <p className="exhibition-banner-desc">{data.exhibition.description}</p>
          </div>
        )}

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
                <Calendar size={16} className="tab-date-icon" />
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
            {currentDay.overview && (
              <p className="day-overview-text">{currentDay.overview}</p>
            )}
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
                    <Clock size={14} className="clock-icon" />
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
