import styles from './CurrencyCard.module.css';

const CurrencyCard = ({ rate }) => {
    const flagCode = rate.Cur_Abbreviation.slice(0, 2).toLowerCase();

    return (
        <a
            href={`https://www.nbrb.by/statistics/rates/ratesdaily/?paramcurrencyid=${rate.Cur_ID}`}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.card}
        >
            <div className={styles.header}>
                {flagCode ? (
                    <span className={`flag-icon flag-icon-${flagCode} ${styles.flag}`} />
                ) : (
                    <span className={styles.fallbackFlag}>🌐</span>
                )}
                <h3 className={styles.title}>{rate.Cur_Abbreviation}</h3>
            </div>
            <div className={styles.info}>
                <strong>{rate.Cur_OfficialRate.toFixed(4)}</strong> BYN<br />
                {rate.Cur_Scale > 1 &&
                    <span className={styles.scale}>{rate.Cur_Scale}</span>} <span>{rate.Cur_Name}</span>
            </div>
            <div className={styles.date}>
                Обновлено: {new Date(rate.Date).toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'UTC',
                })}
            </div>
        </a>
    );
}

export default CurrencyCard;
