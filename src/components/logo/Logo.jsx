import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <h1>Sundries</h1>
            <span role='img' aria-label='globe' className={styles.icon}>🌐</span>
        </div>
    );
}

export default Logo;
