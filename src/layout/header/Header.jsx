import Navbar from '../../components/navbar/Navbar';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Sundries</div>
            <Navbar />
        </header>
    );
}

export default Header;
