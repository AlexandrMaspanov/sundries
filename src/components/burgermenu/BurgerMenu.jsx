import styles from './BurgerMenu.module.css';

const BurgerMenu = ({ isOpen, onClick }) => {
    return (
        <button
            className={`${styles.burger} ${isOpen ? styles.open : ''}`}
            onClick={onClick}
            aria-label='Toggle menu'
        >
            <span className={styles.line} />
            <span className={styles.line} />
            <span className={styles.line} />
        </button>
    );
}

export default BurgerMenu;
