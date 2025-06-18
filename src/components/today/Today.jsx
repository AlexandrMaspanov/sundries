import styles from './Today.module.css';

const Today = () => {
    const today = new Date();
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }
    const formattedDate = today.toLocaleDateString('ru-RU', options);

    return (
        <div className={styles.today}>
            {formattedDate}
        </div>
    );
}

export default Today;
