import { lazy } from 'react';
import RootLayout from '../layout/RootLayout';

const Home = lazy(() => import('../pages/home/Home'));
const Weather = lazy(() => import('../pages/weather/Weather'));
const ExchangeRates = lazy(() => import('../pages/exchange-rates/ExchangeRates'));
const NotFoundPage = lazy(() => import('../pages/notfoundpage/Notfoundpage'));

const routes = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'weather', element: <Weather /> },
            { path: 'exchange-rates', element: <ExchangeRates /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
];

export default routes;
