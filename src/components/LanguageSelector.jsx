import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { FlagTJ, FlagRU, FlagUS } from "./Flags";

const languages = [
  { code: "tj", label: "Тоҷикӣ", flagEmoji: "🇹🇯", flagComponent: <FlagTJ /> },
  { code: "ru", label: "Русский", flagEmoji: "🇷🇺", flagComponent: <FlagRU /> },
  { code: "en", label: "English", flagEmoji: "🇺🇸", flagComponent: <FlagUS /> },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLang = languages.find((l) => l.code === language) || languages[1];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-lang-select" ref={dropdownRef}>
      <button
        type="button"
        className={`lang-select-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Выбор языка"
      >
        <span className="lang-flag-svg">{selectedLang.flagComponent}</span>
        <span className="lang-label">{selectedLang.label}</span>
        <span className="lang-chevron">▾</span>
      </button>

      {isOpen && (
        <ul className="lang-select-options">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={`lang-select-option ${language === lang.code ? "selected" : ""}`}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              <span className="lang-flag-svg">{lang.flagComponent}</span>
              <span className="lang-label">{lang.label}</span>
              {language === lang.code && <span className="check-mark">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
