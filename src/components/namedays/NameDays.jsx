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

        const today = new Date();
        const day = String(today.getDate()).padStart(2, 0);
        const month = String(today.getMonth() + 1).padStart(2, 0);
        const key = `${month}-${day}`;

        const url = `${import.meta.env.BASE_URL}nameDays.json`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setNames(data[key] || []);
            })
            .catch(error => {
                console.error('Ошибка при загрузке имен: ', error);
                setError(error.message || 'Неизвестная ошибка');
                setNames([]);
            })

        setLoading(false);
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
            ) : (
                <>
                    {names.length ? (
                        <p className={styles.NameDays}>
                            {names.join(', ')}
                        </p>
                    ) : (
                        <p>Сегодня именинников нет</p>
                    )}
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://www.pravmir.ru/pravoslavnyj-kalendar-imenin/' target='_blank' rel='noopener noreferrer'>АНО "Правмир"</a>
                    </div>
                </>
            )}
        </>
    );
}

export default NameDays;
