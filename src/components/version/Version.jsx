import packageJson from '../../../package.json';
import styles from './Version.module.css';

const Version = () => {
    return (
        <div className={styles.version}>
            Версия: {packageJson.version}
        </div>
    );
}

export default Version;
