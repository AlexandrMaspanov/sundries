import { useEffect, useState } from 'react';
import styles from './Holidays.module.css';
import Loader from '../UI/loader/Loader';
import { API_KEYS } from '../../config';
import TranslateButton from '../translatebutton/TranslateButton';

const Holidays = () => {
    const HOLIDAYS_API_KEY = API_KEYS.holidays;
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

            const url = `https://calendarific.com/api/v2/holidays?&api_key=${HOLIDAYS_API_KEY}&country=BY&year=${year}`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка при получении праздников. ', error);
            }

            const data = await res.json();
            const todayHolidays = data?.response?.holidays?.find(item => item?.date?.iso === todayStr);
            setHolidays(todayHolidays?.name);
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
                        <>
                            <p className={styles.holidays}>
                                {holidays}
                            </p>
                            <TranslateButton text={`${holidays}`} />
                        </>
                    ) : (
                        <p>Официальных праздников сегодня нет</p>
                    )}
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://calendarific.com/holidays/2025/BY' target='_blank' rel='noopener noreferrer'>Calendarific</a>
                    </div>
                </>
            )}
        </>
    );
}

export default Holidays;
