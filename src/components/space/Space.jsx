import { useEffect, useState } from 'react';
import styles from './Space.module.css';
import Loader from '../UI/loader/Loader';
import { API_KEYS } from '../../config';

const Space = () => {
    const SPACE_API_KEY = API_KEYS.space;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://api.nasa.gov/planetary/apod?api_key=${SPACE_API_KEY}`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка при получении данных. ', error);
            }

            const data = await res.json();

            setData(data);
        } catch (error) {
            console.error('Ошибка при получении данных ', error);
            setError(error.message || 'Неизвестная ошибка');
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : data ? (
                <div className={styles.space}>
                    <img
                        className={styles.spaceImg}
                        src={data.url}
                        alt={data.title}
                    />
                    <div className={styles.description}>
                        <p><strong>{data.title}</strong></p>
                        <p>{data.explanation}</p>
                    </div>
                </div>
            ) : (
                <p>Нет данных</p>
            )}
        </>
    );
}

export default Space;
