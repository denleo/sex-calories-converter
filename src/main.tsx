import React from "react";
import ReactDOM from "react-dom/client";
import App from "./layouts/app/App.tsx";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
