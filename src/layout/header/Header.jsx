import { useState } from 'react';
import BurgerMenu from '../../components/burgermenu/BurgerMenu';
import Logo from '../../components/logo/Logo';
import Navbar from '../../components/navbar/Navbar';
import styles from './Header.module.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Logo />
                <Navbar isOpen={menuOpen} onCloseMenu={closeMenu} />
                <BurgerMenu isOpen={menuOpen} onClick={toggleMenu} />
            </div>
            {menuOpen &&
                <div
                    className={styles.overlay}
                    onClick={closeMenu}
                />
            }
        </header>
    );
}

export default Header;
