import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import LettersProvider from "./state/LettersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LettersProvider>
      <App />
    </LettersProvider>
  </React.StrictMode>
);
