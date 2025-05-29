import styles from './CustomButton.module.css';

const CustomButton = ({ onClick, children }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
}

export default CustomButton;
