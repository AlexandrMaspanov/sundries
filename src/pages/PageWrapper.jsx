import styles from './PageWrapper.module.css';

const PageWrapper = ({ children }) => {
    return (
        <div className={styles.page}>
            {children}
        </div>

    );
}

export default PageWrapper;
