import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const NavItem = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
            {children}
        </NavLink>
    );
}

export default NavItem;
