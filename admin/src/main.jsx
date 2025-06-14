import React from "react"; // ✅ Add this if missing
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, useLocation } from 'react-router-dom';

// PrimeReact CSS
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"; // PrimeFlex for layout utilities
// Import a PrimeReact theme, e.g., Lara Light Indigo (Sakai default)
import "primereact/resources/themes/lara-light-indigo/theme.css";

// Sakai Layout SASS (ensure SASS is processed by Vite)
// You might need to rename the main scss file if it's not layout.scss or adjust the path
import "./styles/layout/layout.scss";
// import './styles/demo/Demos.scss'; // Optional: if you use demo styles

// Layout Context Provider
import { LayoutProvider } from "./layout/context/layoutcontext";
import { MenuProvider } from "./layout/context/menucontext";

const Root = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';

  return (
    <React.StrictMode>
      {isLoginPage ? (
        <App />
      ) : (
        <LayoutProvider>
          <MenuProvider>
            <App />
          </MenuProvider>
        </LayoutProvider>
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
