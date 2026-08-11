import React from "react";
import LandingPage from "./LandingPage";
import { LanguageProvider } from "./i18n/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <LandingPage />
      </div>
    </LanguageProvider>
  );
}

export default App;
