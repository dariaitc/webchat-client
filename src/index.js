import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { BrowserRouter } from 'react-router-dom';
import common_heb from "./translations/heb/common.json";
import common_en from "./translations/en/common.json";
import { LoginDetailsContextProvider } from "./context/LoginDetails/LoginDetailsContext"

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'heb',                              // language to use
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    heb: {
      common: common_heb
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <LoginDetailsContextProvider>
          <App />
        </LoginDetailsContextProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
