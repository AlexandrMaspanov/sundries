import styles from './InfoBlock.module.css';

const InfoBlock = ({ icon, title, children }) => {
    return (
        <section className={styles.block}>
            <h2>
                {icon} {title}
            </h2>
            {children}
        </section>
    );
}

export default InfoBlock;
