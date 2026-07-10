import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { PortfolioProvider } from "./context/portfolioContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { registerServiceWorker } from "./registerServiceWorker.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

registerServiceWorker();
