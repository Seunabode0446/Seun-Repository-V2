import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Remove loading screen when React app loads
const loadingContainer = document.querySelector('.loading-container');
if (loadingContainer) {
  setTimeout(() => {
    loadingContainer.style.opacity = '0';
    loadingContainer.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() => {
      loadingContainer.remove();
    }, 500);
  }, 1000);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)