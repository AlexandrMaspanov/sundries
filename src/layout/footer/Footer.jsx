import Version from '../../components/version/Version';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Sundries. Все права защищены.</p>
            <Version />
        </footer>
    );
}

export default Footer;
