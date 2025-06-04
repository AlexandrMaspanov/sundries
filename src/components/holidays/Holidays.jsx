import { useEffect, useState } from 'react';
import styles from './Holidays.module.css';
import Loader from '../UI/loader/Loader';

const Holidays = () => {
    const [holidays, setHolidays] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHolidays = async () => {
        setLoading(true);
        setError(null);

        try {
            const today = new Date();
            const year = today.getFullYear();
            const todayStr = today.toISOString().slice(0, 10);

            const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/BY`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка при получении праздников. ', error);
            }

            const data = await res.json();
            const todayHolidays = data.find(item => item.date === todayStr);
            setHolidays(todayHolidays?.localName);
        } catch (error) {
            console.error('Ошибка при получении праздников ', error);
            setError(error.message || 'Неизвестная ошибка');
            setHolidays(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHolidays();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : (
                <>
                    {holidays ? (
                    <p className={styles.holidays}>
                        {holidays.join(', ')}
                    </p>
                    ) : (
                    <p>Официальных праздников сегодня нет</p>
                    )}
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://date.nager.at/PublicHoliday/Belarus' target='_blank' rel='noopener noreferrer'>Nager.Date</a>
                    </div>
                </>
            )}
        </>
    );
}

export default Holidays;
