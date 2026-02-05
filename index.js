import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // Importado una sola vez
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Medición de rendimiento
reportWebVitals();
