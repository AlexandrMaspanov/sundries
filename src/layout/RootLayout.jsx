import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import styles from './RootLayout.module.css';

const RootLayout = () => {
    return (
        <div className={styles.layout}>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default RootLayout;
