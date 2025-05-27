import { useEffect, useState } from 'react';
import styles from './Weather.module.css';
import { API_KEYS } from '../../config';
import PageWrapper from '../PageWrapper';
import Loader from '../../components/UI/loader/Loader';
import CitySelect from '../../components/cityselect/CitySelect';

const Weather = () => {
    const [coordinates, setCoordinates] = useState({ lat: 53.9, lon: 27.5667 }); // координаты Минска
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const WEATHER_API_KEY = API_KEYS.weather;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`;

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(url);
                const data = await res.json();
                if (data.cod && data.cod !== 200) {
                    setError(data.message || 'Ошибка получения данных');
                    setWeather(null);
                } else {
                    setWeather(data);
                }
            } catch (error) {
                console.error('Ошибка загрузки погоды: ', error);
                setError(error.message);
                setWeather(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [coordinates]);

    let formattedDate = 'нет данных';
    let gmtOffset = '';
    let weatherClass = styles.default;

    if (weather) {
        const localDate = new Date((weather.dt + weather.timezone) * 1000);
        formattedDate = localDate.toLocaleString('ru-RU', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
        });

        gmtOffset = `GMT${weather.timezone >= 0 ? '+' : ''}${weather.timezone / 3600}`;

        weatherClass = getWeatherClass(weather.weather[0].main);
    }

    return (
        <PageWrapper>
            <h1>Погода в городе</h1>
            <CitySelect onCityChange={setCoordinates} />
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : weather ? (
                <div className={`${styles.card} ${weatherClass}`}>
                    <div className={styles.city}>
                        {weather.name}, {weather.sys.country}
                    </div>
                    <img
                        className={styles.icon}
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    />
                    <div className={styles.description}>
                        {weather.weather[0].description}
                    </div>
                    <div className={styles.temp}>
                        {Math.round(weather.main.temp)} °C
                    </div>
                    <div className={styles.details}>
                        Ощущается как: {Math.round(weather.main.feels_like)} °C<br />
                        Влажность: {weather.main.humidity} %<br />
                        Ветер: {weather.wind.speed} м/с<br />
                        Давление: {weather.main.pressure} гПа<br />
                        Обновлено: {formattedDate}{gmtOffset && ` (${gmtOffset})`}
                    </div>
                </div>
            ) : (
                <p>Нет данных</p>
            )}
        </PageWrapper>
    );
}

const getWeatherClass = (main) => {
    switch (main) {
        case 'Clear':
            return styles.clear;
        case 'Clouds':
            return styles.clouds;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            return styles.rain;
        case 'Snow':
            return styles.snow;
        case 'Mist':
        case 'Fog':
        case 'Haze':
            return styles.fog;
        default:
            return styles.default;
    }
}

export default Weather;
