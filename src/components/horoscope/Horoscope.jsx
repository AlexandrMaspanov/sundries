import { useEffect, useState } from 'react';
import styles from './Horoscope.module.css';
import Loader from '../UI/loader/Loader';

const Horoscope = () => {
    const zodiacSigns = [
        { key: 'aries', name: 'Овен', icon: '♈' },
        { key: 'taurus', name: 'Телец', icon: '♉' },
        { key: 'gemini', name: 'Близнецы', icon: '♊' },
        { key: 'cancer', name: 'Рак', icon: '♋' },
        { key: 'leo', name: 'Лев', icon: '♌' },
        { key: 'virgo', name: 'Дева', icon: '♍' },
        { key: 'libra', name: 'Весы', icon: '♎' },
        { key: 'scorpio', name: 'Скорпион', icon: '♏' },
        { key: 'sagittarius', name: 'Стрелец', icon: '♐' },
        { key: 'capricorn', name: 'Козерог', icon: '♑' },
        { key: 'aquarius', name: 'Водолей', icon: '♒' },
        { key: 'pisces', name: 'Рыбы', icon: '♓' }
    ];

    const [horoscopes, setHoroscopes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHoroscopes = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://ignio.com/r/export/utf/xml/daily/com.xml`;
            const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const res = await fetch(proxy);

            if (!res.ok) {
                throw new Error('Ошибка при запросе через прокси. ', error);
            }

            const data = await res.json();

            const parser = new DOMParser();
            const xml = parser.parseFromString(data.contents, 'text/xml');

            const allHoroscopes = {};
            zodiacSigns.forEach(({ key }) => {
                const text = xml.querySelector(`${key} > today`)?.textContent;
                allHoroscopes[key] = text || 'Не найден гороскоп';
            });

            setHoroscopes(allHoroscopes);
        } catch (error) {
            console.error('Ошибка при получении данных ', error);
            setError(error.message || 'Неизвестная ошибка');
            setHoroscopes({});
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHoroscopes();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : (
                <>
                    {horoscopes ? (
                        <div className={styles.horoscope}>
                            <ul className={styles.horoscopeList}>
                                {zodiacSigns.map(({ key, name, icon }) => (
                                    <li key={key} className={styles.horoscopeItem}>
                                        <strong>{icon} {name}</strong>
                                        <p>{horoscopes[key]}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>Нет данных</p>
                    )}
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://ignio.com/r/export/utf/xml/daily/com.xml' target='_blank' rel='noopener noreferrer'>Ignio</a>
                    </div>
                </>
            )}
        </>
    );
}

export default Horoscope;
