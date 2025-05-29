import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import 'flag-icon-css/css/flag-icon.min.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/sundries/'>
      <App />
    </BrowserRouter>
  </StrictMode>
)
