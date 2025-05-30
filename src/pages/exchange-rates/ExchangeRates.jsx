import { useEffect, useState } from 'react';
import styles from './ExchangeRates.module.css';
import PageWrapper from '../PageWrapper';
import Loader from '../../components/UI/loader/Loader';
import CurrencySelect from '../../components/currencyselect/CurrencySelect';
import CurrencyCard from './CurrencyCard';
import CustomButton from '../../components/custombutton/CustomButton';

const ExchangeRates = () => {
    const DEFAULT_CURRENCIES = ['USD', 'EUR', 'RUB'];

    const [rates, setRates] = useState([]);
    const [selected, setSelected] = useState(() => {
        const selectedCurrencies = localStorage.getItem('selectedCurrencies');
        return selectedCurrencies ? JSON.parse(selectedCurrencies) : DEFAULT_CURRENCIES;
    });
    const [allCurrencies, setAllCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRates = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Ошибка загрузки курсов валют: ', error);
            }

            const data = await res.json();
            setRates(data);
            setAllCurrencies(data.map(cur => cur.Cur_Abbreviation));
        } catch (error) {
            console.error('Ошибка загрузки курсов валют: ', error);
            setError(error.message || 'Неизвестная ошибка');
            setRates([]);
            setAllCurrencies([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        localStorage.setItem('selectedCurrencies', JSON.stringify(selected));
    }, [selected]);

    useEffect(() => {

        fetchRates();

        const intervalId = setInterval(() => {
            fetchRates();
        }, 10 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleReset = () => {
        localStorage.removeItem('selectedCurrencies');
        setSelected(DEFAULT_CURRENCIES);
    }

    let displayedRates = null;
    if (rates) {
        displayedRates = selected
            .map(code => rates.find(rate => rate.Cur_Abbreviation === code))
            .filter(Boolean);
    }

    return (
        <PageWrapper>
            <h1>Курсы валют Национального банка РБ</h1>
            <CurrencySelect
                selected={selected}
                setSelected={setSelected}
                allCurrencies={allCurrencies}
            />
            <CustomButton onClick={handleReset}>
                Сбросить выбор
            </CustomButton>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className={styles.error}>Ошибка: {error}</p>
            ) : rates ? (
                <>
                    <div className={styles.cards}>
                        {displayedRates.map(rate => (
                            <CurrencyCard key={rate.Cur_ID} rate={rate} />
                        ))}
                    </div>
                    <div className={styles.source}>
                        <span role="img" aria-label="bank">🏦</span> Данные предоставлены: <a
                            href='https://www.nbrb.by/'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Национальным банком Республики Беларусь
                        </a>
                    </div>
                </>
            ) : (
                <p>Нет данных</p>
            )}
        </PageWrapper>
    );
}

export default ExchangeRates;
