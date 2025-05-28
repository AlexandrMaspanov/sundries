import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

const NavItem = ({ to, children, onClick }) => {
    return (
        <NavLink
            to={to}
            end={to === '/'}
            onClick={onClick}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
            {children}
        </NavLink>
    );
}

export default NavItem;
