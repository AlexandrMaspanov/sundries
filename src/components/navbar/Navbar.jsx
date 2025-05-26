import NavItem from './NavItem';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <NavItem to='/'>Главная</NavItem>
            <NavItem to='/weather'>Погода</NavItem>
            <NavItem to='/exchange-rates'>Курсы валют</NavItem>
        </nav>
    );
}

export default Navbar;
