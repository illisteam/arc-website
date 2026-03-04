import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const loaderElement = document.getElementById('initial-loader');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Hide initial loader once React bundle is loaded
if (loaderElement) {
  loaderElement.style.opacity = '0';
  setTimeout(() => {
    loaderElement.remove();
  }, 500);
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);