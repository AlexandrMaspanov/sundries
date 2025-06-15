import React from "react";
import { Routes, Route } from 'react-router-dom';

import RootLayout from './layout/RootLayout';
import Home from './pages/home/Home';
import Weather from './pages/weather/Weather';
import ExchangeRates from './pages/exchange-rates/ExchangeRates';
import NotFoundPage from "./pages/notfoundpage/Notfoundpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="weather" element={<Weather />} />
        <Route path="exchange-rates" element={<ExchangeRates />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App;
