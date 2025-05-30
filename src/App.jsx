import React from "react";
import { Routes, Route } from 'react-router-dom';

import RootLayout from './layout/RootLayout';
import Home from './pages/home/Home';
import Weather from './pages/weather/Weather';
import ExchangeRates from './pages/exchange-rates/ExchangeRates';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="weather" element={<Weather />} />
          <Route path="exchange-rates" element={<ExchangeRates />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
