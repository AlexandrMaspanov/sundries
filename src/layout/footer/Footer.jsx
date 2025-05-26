import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Sundries. Все права защищены.</p>
        </footer>
    );
}

export default Footer;
