import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Loader from '../components/UI/loader/Loader';
import styles from './RootLayout.module.css';

const RootLayout = () => (
    <div className={styles.layout}>
        <Header />

        <main>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </main>

        <Footer />
    </div>
);

export default RootLayout;
