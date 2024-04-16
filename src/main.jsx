import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { BackgroundImageProvider } from "./context/BackgroundImageContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
    <BackgroundImageProvider>
      <App />
      </BackgroundImageProvider>
    </BrowserRouter>
  // </React.StrictMode>,

  
);
