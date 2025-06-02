import { useEffect, useState } from 'react';
import styles from './Word.module.css';
import Loader from '../UI/loader/Loader';

const Word = () => {
    const [word, setWord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWord = async () => {
        setLoading(true);
        setError(null);

        try {
            const randomWord = await fetch('https://random-word-api.herokuapp.com/word');
            const rndWord = await randomWord.json();

            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${rndWord[0]}`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка при получении данных. ', error);
            }

            const data = await res.json();

            setWord(data);
        } catch (error) {
            console.error('Ошибка при получении данных ', error);
            setError(error.message || 'Неизвестная ошибка');
            setWord(null);
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
            ) : word.length ? (
                <>
                    {word.map((item, index) => (
                        <div key={index} className={styles.word}>
                            <p><strong>{item.word}</strong></p>
                            <ul className={styles.list}>
                                {item.meanings[0].definitions.map((elem, ind) => (
                                    <li key={ind} className={styles.meaning}>{elem.definition}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            ) : (
                <p>Нет данных</p>
            )}
        </>
    );
}

export default Word;
