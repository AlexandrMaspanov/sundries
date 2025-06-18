import { useEffect, useState } from 'react';
import styles from './Quote.module.css';
import Loader from '../UI/loader/Loader';
import TranslateButton from '../translatebutton/TranslateButton';

const Quote = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuote = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://thequoteshub.com/api/`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка при получении цитаты. ', error);
            }

            const data = await res.json();

            setQuote({
                text: data.text,
                author: data.author
            });
        } catch (error) {
            console.error('Ошибка при получении цитаты ', error);
            setError(error.message || 'Неизвестная ошибка');
            setQuote(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : (
                <>
                    {quote ? (
                        <>
                            <blockquote className={styles.quote}>
                                "{quote.text}"
                            </blockquote>
                            <p>- {quote.author}</p>
                            <TranslateButton text={`${quote.text}\n${quote.author}`} />
                        </>
                    ) : (
                        <p>Нет цитаты</p>
                    )}
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://thequoteshub.com/' target='_blank' rel='noopener noreferrer'>The Quotes Hub</a>
                    </div>
                </>
            )}
        </>
    );
}

export default Quote;
