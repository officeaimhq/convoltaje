import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../index.css';

// Desregistrar cualquier service worker activo para evitar problemas de caché en desarrollo
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
