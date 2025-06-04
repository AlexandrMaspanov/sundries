import { useEffect, useState } from 'react';
import styles from './Word.module.css';
import Loader from '../UI/loader/Loader';
import TranslateButton from '../translatebutton/TranslateButton';

const Word = () => {
    const [word, setWord] = useState(null);
    const [meanings, setMeanings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWord = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = 'https://random-word-api.vercel.app/api?words=1';
            const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const res = await fetch(proxy);
            const json = await res.json();
            const parsedWord = JSON.parse(json.contents)[0];

            if (parsedWord) {
                setWord(parsedWord);
                const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${parsedWord}`;
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
            ) : (
                <>
                    {word ? (
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
                            <TranslateButton text={`${word}\n${meanings?.map(meaning => meaning.definition).join('\n')}`} />
                        </>
                    ) : (
                        <p>Слово не найдено</p>
                    )}
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://dictionaryapi.dev/' target='_blank' rel='noopener noreferrer'>Free Dictionary API</a>
                    </div>
                </>
            )}
        </>
    );
}

export default Word;
