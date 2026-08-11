import React from "react";

// Флаг Таджикистана 🇹🇯
export const FlagTJ = () => (
  <svg
    width="20"
    height="14"
    viewBox="0 0 600 400"
    style={{ borderRadius: "2px", display: "inline-block", verticalAlign: "middle" }}
  >
    <rect width="600" height="400" fill="#fff" />
    <rect width="600" height="114" fill="#cc0000" />
    <rect y="286" width="600" height="114" fill="#006600" />
    {/* Золотая корона со звездами */}
    <g transform="translate(300, 200) scale(0.7)">
      <path
        d="M -30,25 L -45,-15 L -20,-5 L 0,-30 L 20,-5 L 45,-15 L 30,25 Z"
        fill="#f8c300"
      />
      <circle cx="0" cy="-45" r="5" fill="#f8c300" />
      <circle cx="-35" cy="-35" r="5" fill="#f8c300" />
      <circle cx="35" cy="-35" r="5" fill="#f8c300" />
      <circle cx="-60" cy="-10" r="5" fill="#f8c300" />
      <circle cx="60" cy="-10" r="5" fill="#f8c300" />
      <circle cx="-75" cy="20" r="5" fill="#f8c300" />
      <circle cx="75" cy="20" r="5" fill="#f8c300" />
    </g>
  </svg>
);

// Флаг России 🇷🇺
export const FlagRU = () => (
  <svg
    width="20"
    height="14"
    viewBox="0 0 900 600"
    style={{ borderRadius: "2px", display: "inline-block", verticalAlign: "middle" }}
  >
    <rect width="900" height="600" fill="#fff" />
    <rect y="200" width="900" height="200" fill="#0039a6" />
    <rect y="400" width="900" height="200" fill="#d52b1e" />
  </svg>
);

// Флаг США (English) 🇺🇸
export const FlagUS = () => (
  <svg
    width="20"
    height="14"
    viewBox="0 0 1900 1000"
    style={{ borderRadius: "2px", display: "inline-block", verticalAlign: "middle" }}
  >
    <rect width="1900" height="1000" fill="#bb133e" />
    <rect y="76.9" width="1900" height="76.9" fill="#fff" />
    <rect y="230.8" width="1900" height="76.9" fill="#fff" />
    <rect y="384.6" width="1900" height="76.9" fill="#fff" />
    <rect y="538.5" width="1900" height="76.9" fill="#fff" />
    <rect y="692.3" width="1900" height="76.9" fill="#fff" />
    <rect y="846.2" width="1900" height="76.9" fill="#fff" />
    <rect width="760" height="538.5" fill="#002147" />
    {/* Звезды США */}
    <g fill="#fff">
      {[...Array(5)].map((_, r) =>
        [...Array(6)].map((_, c) => (
          <circle
            key={`s1-${r}-${c}`}
            cx={63 + c * 126}
            cy={53 + r * 107}
            r="18"
          />
        ))
      )}
      {[...Array(4)].map((_, r) =>
        [...Array(5)].map((_, c) => (
          <circle
            key={`s2-${r}-${c}`}
            cx={126 + c * 126}
            cy={106 + r * 107}
            r="18"
          />
        ))
      )}
    </g>
  </svg>
);
