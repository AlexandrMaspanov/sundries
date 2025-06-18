import { useEffect, useState } from 'react';
import styles from './Weather.module.css';
import { API_KEYS } from '../../config';
import PageWrapper from '../PageWrapper';
import Loader from '../../components/UI/loader/Loader';
import CitySelect from '../../components/cityselect/CitySelect';
import CustomButton from '../../components/custombutton/CustomButton';

const Weather = () => {
    const WEATHER_API_KEY = API_KEYS.weather;
    const DEAFAULT_CITY = 'Минск';
    const DEAFAULT_COORDINATES = { lat: 53.9, lon: 27.5667 }; // координаты Минска

    const [coordinates, setCoordinates] = useState(() => {
        const savedCoordinates = localStorage.getItem('savedCoordinates');
        return savedCoordinates ? JSON.parse(savedCoordinates) : null;
    });
    const [selectedCity, setSelectedCity] = useState(localStorage.getItem('savedCity') || '');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInitialised, setIsInitialized] = useState(false);

    const fetchCityName = async (lat, lon) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            return data.address.city || data.address.town || data.address.village;
        } catch (error) {
            console.error('Ошибка при определении города: ', error);
            return;
        }
    }

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`;
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

    useEffect(() => {
        const savedCity = localStorage.getItem('savedCity');
        const savedCoordinates = localStorage.getItem('savedCoordinates');

        if (savedCity && savedCoordinates) {
            try {
                const parsedCoords = JSON.parse(savedCoordinates);

                setSelectedCity(savedCity);
                setCoordinates(parsedCoords);
            } catch (error) {
                console.error('Ошибка парсинга координат: ', error);
            }
            setIsInitialized(true);
            return;
        }

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude: lat, longitude: lon } = position.coords;

                const cityName = await fetchCityName(lat, lon);

                if (cityName) {
                    setSelectedCity(cityName);
                    setCoordinates({ lat, lon });

                    localStorage.setItem('savedCity', cityName);
                    localStorage.setItem('savedCoordinates', JSON.stringify({ lat, lon }));
                } else {
                    setSelectedCity(DEAFAULT_CITY);
                    setCoordinates(DEAFAULT_COORDINATES);

                    localStorage.setItem('savedCity', DEAFAULT_CITY);
                    localStorage.setItem('savedCoordinates', DEAFAULT_COORDINATES);
                }
            }, (error) => {
                console.warn(`Геолокация отклонена. Ошибка: ${error}, используем ${DEAFAULT_CITY}`);

                setSelectedCity(DEAFAULT_CITY);
                setCoordinates(DEAFAULT_COORDINATES);
            });
        } else {
            setSelectedCity(DEAFAULT_CITY);
            setCoordinates(DEAFAULT_COORDINATES);
        }

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!coordinates || !isInitialised) return;

        fetchWeather();

        const intervalId = setInterval(() => {
            fetchWeather();
        }, 10 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [coordinates, isInitialised]);

    const handleGeolocationClick = () => {
        if (!navigator.geolocation) {
            alert('Ваш браузер не поддерживает геолокацию');
            return;
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude: lat, longitude: lon } = position.coords;

            const cityName = await fetchCityName(lat, lon);

            if (cityName) {
                setSelectedCity(cityName);
                setCoordinates({ lat, lon });

                localStorage.setItem('savedCity', cityName);
                localStorage.setItem('savedCoordinates', JSON.stringify({ lat, lon }));
            }

            setLoading(false);
        },
            (error) => {
                console.error('Ошибка получения геолокации: ', error);
                alert('Не удалось получить геопозицию');
                setLoading(false);
            }
        );
    }

    let formattedDate = 'нет данных';
    let gmtOffset = '';
    let weatherClass = styles.default;

    if (weather) {
        const localDate = new Date((weather.dt + weather.timezone) * 1000);
        formattedDate = localDate.toLocaleString('ru-RU', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
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
            <CitySelect
                value={selectedCity ? { label: selectedCity, value: selectedCity } : null}
                onChange={setSelectedCity}
                onCityChange={setCoordinates}
            />
            <CustomButton onClick={handleGeolocationClick}>
                Обновить по моей геопозиции
            </CustomButton>
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
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://openweathermap.org/' target='_blank' rel='noopener noreferrer'>OpenWeatherMap</a>
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
