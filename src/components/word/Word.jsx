import { useEffect, useState } from 'react';
import styles from './Word.module.css';
import Loader from '../UI/loader/Loader';

const Word = () => {
    const [word, setWord] = useState(null);
    const [meanings, setMeanings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWord = async () => {
        setLoading(true);
        setError(null);

        try {
            const randomWord = await fetch('https://random-word-api.herokuapp.com/word');
            const rndWord = await randomWord.json();

            if (rndWord[0]) {
                setWord(rndWord[0]);
                const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${rndWord[0]}`;
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error('Ошибка при получении данных. ', error);
                }

                const data = await res.json();

                setMeanings(data[0].meanings[0].definitions);
            }
        } catch (error) {
            console.error('Ошибка при получении данных ', error);
            setError(error.message || 'Неизвестная ошибка');
            setWord(null);
            setMeanings([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWord();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : word ? (
                <>
                    <p><strong>{word}</strong></p>
                    {meanings ? (
                        <ul className={styles.list}>
                        {meanings.map((meaning, ind) => (
                            <li key={ind} className={styles.meaning}>{meaning.definition}</li>
                        ))}
                    </ul>
                    ) : (
                        <p>Определения не найдены</p>
                    )}
                </>
            ) : (
                <p>Слово не найдено</p>
            )}
        </>
    );
}

export default Word;
