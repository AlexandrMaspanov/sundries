import RootLayout from '../layout/RootLayout';
import Home from '../pages/home/Home';
import Weather from '../pages/weather/Weather';
import ExchangeRates from '../pages/exchange-rates/ExchangeRates';
import NotFoundPage from '../pages/notfoundpage/Notfoundpage';

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
