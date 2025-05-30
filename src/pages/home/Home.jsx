import InfoBlock from '../../components/infoblock/InfoBlock';
import NameDays from '../../components/namedays/NameDays';
import Today from '../../components/today/Today';
import PageWrapper from '../PageWrapper';
import styles from './Home.module.css';

const Home = () => {
    const zodiacSigns = [
        { title: 'Овен', icon: '♈' },
        { title: 'Телец', icon: '♉' },
        { title: 'Близнецы', icon: '♊' },
        { title: 'Рак', icon: '♋' },
        { title: 'Лев', icon: '♌' },
        { title: 'Дева', icon: '♍' },
        { title: 'Весы', icon: '♎' },
        { title: 'Скорпион', icon: '♏' },
        { title: 'Стрелец', icon: '♐' },
        { title: 'Козерог', icon: '♑' },
        { title: 'Водолей', icon: '♒' },
        { title: 'Рыбы', icon: '♓' }
    ];

    return (
        <PageWrapper>
            <div className={styles.wrapper}>
                <InfoBlock
                    title='Сегодня'
                    icon='📅'
                >
                    <Today />
                </InfoBlock>

                <InfoBlock
                    title='Кого поздравляем'
                    icon='🗓'
                >
                    <NameDays />
                </InfoBlock>

                <InfoBlock
                    title='Праздник на календаре'
                    icon='🎉'
                >
                    <p>Праздник, памятная дата</p>
                </InfoBlock>

                <InfoBlock
                    title='Мысль на день'
                    icon='💬'
                >
                    <blockquote>
                        <p>Цитата, мудрая мысль</p>
                        <footer>- Автор цитаты</footer>
                    </blockquote>
                </InfoBlock>

                <InfoBlock
                    title='Улыбнись!'
                    icon='😂'
                >
                    <p>Анекдот, шутка</p>
                </InfoBlock>

                <InfoBlock
                    title='Как поднять настроение'
                    icon='🧘‍♂️'
                >
                    <p>Советы по настроению</p>
                </InfoBlock>

                <InfoBlock
                    title='Интересное слово'
                    icon='📌'
                >
                    <p>Слово</p>
                </InfoBlock>

                <InfoBlock
                    title='Разомни мозги'
                    icon='🧩'
                >
                    <p>Задача</p>
                </InfoBlock>

                <InfoBlock
                    title='Звёзды говорят'
                    icon='🔮'
                >
                    <ul className={styles.horoscopeList}>
                        {zodiacSigns.map(sign => (
                            <li key={sign.title} className={styles.horoscopeItem}>
                                <strong>{sign.icon} {sign.title}</strong>
                                <p>краткий гороскоп</p>
                            </li>
                        ))}
                    </ul>
                </InfoBlock>

                <InfoBlock
                    title='Кадр из Вселенной'
                    icon='📷'
                >
                    <p>Фото</p>
                </InfoBlock>
            </div>
        </PageWrapper>
    );
}

export default Home;
