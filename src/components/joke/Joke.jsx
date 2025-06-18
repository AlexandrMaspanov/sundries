import { useEffect, useState } from 'react';
import styles from './Joke.module.css';
import Loader from '../UI/loader/Loader';
import TranslateButton from '../translatebutton/TranslateButton';

const Joke = () => {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJoke = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://v2.jokeapi.dev/joke/Any?type=single`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка при получении данных. ', error);
            }

            const data = await res.json();

            setJoke(data.joke);
        } catch (error) {
            console.error('Ошибка при получении данных ', error);
            setError(error.message || 'Неизвестная ошибка');
            setJoke(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : (
                <>
                    {joke ? (
                        <>
                            <p className={styles.joke}>
                                {joke}
                            </p>
                            <TranslateButton text={joke} />
                        </>
                    ) : (
                        <p>Нет данных</p>
                    )}
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://v2.jokeapi.dev/' target='_blank' rel='noopener noreferrer'>JokeAPI</a>
                    </div>
                </>
            )}
        </>
    );
}

export default Joke;
