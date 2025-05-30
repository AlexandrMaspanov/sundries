import { useEffect, useState } from 'react';
import styles from './NameDays.module.css';
import Loader from '../UI/loader/Loader';

const NameDays = () => {
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNameDays = async () => {
        setLoading(true);
        setError(null);

        try {
            const today = new Date();
            const day = today.getDate();
            const month = today.getDate();

            const url = `https://nameday.abalin.net/api/v2/namedays?country=ru&month=${month}&day=${day}`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка при получении именинников. ', error);
            }

            const data = await res.json();
            const nameList = data.data.namedays.ru.split(',').map(name => name.trim());
            setNames(nameList);
        } catch (error) {
            console.error('Ошибка при получении именинников ', error);
            setError(error.message || 'Неизвестная ошибка');
            setNames([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNameDays();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : names.length ? (
                <p className={styles.NameDays}>
                    {names.join(', ')}
                </p>
            ) : (
                <p>Сегодня именинников нет</p>
            )}
        </>
    );
}

export default NameDays;
