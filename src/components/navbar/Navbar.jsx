import NavItem from './navitem/NavItem';
import styles from './Navbar.module.css';

const Navbar = ({ isOpen, onCloseMenu }) => {
    return (
        <nav className={`${styles.navbar} ${isOpen ? styles.navbarOpen : ''}`}>
            <ul className={styles.navbarLinks}>
                <NavItem to='/' onClick={onCloseMenu}>Главная</NavItem>
                <NavItem to='/weather' onClick={onCloseMenu}>Погода</NavItem>
                <NavItem to='/exchange-rates' onClick={onCloseMenu}>Курсы валют</NavItem>
            </ul>
        </nav>
    );
}

export default Navbar;
