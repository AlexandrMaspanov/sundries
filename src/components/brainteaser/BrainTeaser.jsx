import { useEffect, useState } from 'react';
import styles from './BrainTeaser.module.css';
import Loader from '../UI/loader/Loader';
import TranslateButton from '../translatebutton/TranslateButton';

const BrainTeaser = () => {
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuestion = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://opentdb.com/api.php?amount=1&type=multiple`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка при получении данных. ', error);
            }

            const data = await res.json();

            const q = data.results[0];
            const answers = [...q.incorrect_answers, q.correct_answer];
            const shuffled = answers.sort(() => Math.random() - 0.5);
            setQuestionData({ ...q, answers: shuffled });
        } catch (error) {
            console.error('Ошибка при получении данных ', error);
            setError(error.message || 'Неизвестная ошибка');
            setQuestionData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, []);

    const handleClick = (answer) => {
        setSelectedAnswer(answer);
        setShowAnswer(true);
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : (
                <>
                    {questionData ? (
                        <div className={styles.brainTeaser}>
                            <h3 dangerouslySetInnerHTML={{ __html: questionData.question }} />
                            <ul>
                                {questionData.answers.map((answer, idx) => (
                                    <li
                                        key={idx}
                                        className={`${styles.answer} ${showAnswer ? answer === questionData.correct_answer ? styles.correct : answer === selectedAnswer ? styles.incorrect : '' : ''}`}
                                        onClick={() => !showAnswer && handleClick(answer)}
                                        dangerouslySetInnerHTML={{ __html: answer }}
                                    />
                                ))}
                            </ul>
                            {showAnswer && selectedAnswer !== questionData.correct_answer && (
                                <div className={styles.result}>
                                    Правильный ответ: <strong dangerouslySetInnerHTML={{ __html: questionData.correct_answer }} />
                                </div>
                            )}
                            <TranslateButton text={`${questionData.question}\n${questionData.answers.join('\n')}`} />
                        </div>
                    ) : (
                        <p>Нет данных</p>
                    )}
                    <div className={styles.source}>
                        Данные предоставлены сервисом: <a href='https://opentdb.com/api_config.php' target='_blank' rel='noopener noreferrer'>Trivia API</a>
                    </div>
                </>
            )}
        </>
    );
}

export default BrainTeaser;
