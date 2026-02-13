
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Safely initialize Lucide icons if the library is loaded
const initIcons = () => {
  if (typeof (window as any).lucide !== 'undefined') {
    (window as any).lucide.createIcons();
  }
};

// Initial run after a small delay to ensure DOM is ready
setTimeout(initIcons, 100);