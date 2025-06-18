import { useEffect, useState } from 'react';
import styles from './MoodTips.module.css';
import Loader from '../UI/loader/Loader';
import TranslateButton from '../translatebutton/TranslateButton';

const MoodTips = () => {
    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTip = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = 'https://api.adviceslip.com/advice';
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка при получении данных. ', error);
            }

            const data = await res.json();

            setTip(data.slip.advice);
        } catch (error) {
            console.error('Ошибка при получении данных ', error);
            setError(error.message || 'Неизвестная ошибка');
            setTip(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTip();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : (
                <>
                    {tip ? (
                        <>
                            <p className={styles.tip}>
                                {tip}
                            </p>
                            <TranslateButton text={tip} />
                        </>
                    ) : (
                        <p>Нет данных</p>
                    )}
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://api.adviceslip.com/' target='_blank' rel='noopener noreferrer'>Advice Slip JSON API</a>
                    </div>
                </>
            )}
        </>
    );
}

export default MoodTips;
