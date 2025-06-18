import { Link } from 'react-router-dom';
import PageWrapper from '../PageWrapper';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <PageWrapper>
            <div className={styles.notFoundPage}>
                This page doesn't exist. Go to the <Link to="/" className={styles.link}>Main</Link>.
            </div>
        </PageWrapper>
    );
}

export default NotFoundPage;
