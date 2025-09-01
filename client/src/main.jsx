import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // <-- import router

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>     {/* <-- wrap App inside router */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
