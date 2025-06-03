import Holidays from '../../components/holidays/Holidays';
import InfoBlock from '../../components/infoblock/InfoBlock';
import Joke from '../../components/joke/Joke';
import NameDays from '../../components/namedays/NameDays';
import Quote from '../../components/quote/Quote';
import Tip from '../../components/moodtips/MoodTips';
import Today from '../../components/today/Today';
import PageWrapper from '../PageWrapper';
import styles from './Home.module.css';
import Word from '../../components/word/Word';
import BrainTeaser from '../../components/brainteaser/BrainTeaser';
import Horoscope from '../../components/horoscope/Horoscope';
import Space from '../../components/space/Space';

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
                    <Holidays />
                </InfoBlock>

                <InfoBlock
                    title='Цитата'
                    icon='💬'
                >
                    <blockquote>
                        <Quote />
                    </blockquote>
                </InfoBlock>

                <InfoBlock
                    title='Улыбнись!'
                    icon='😂'
                >
                    <Joke />
                </InfoBlock>

                <InfoBlock
                    title='Как поднять настроение'
                    icon='🧘‍♂️'
                >
                    <Tip />
                </InfoBlock>

                <InfoBlock
                    title='Интересное слово'
                    icon='📌'
                >
                    <Word />
                </InfoBlock>

                <InfoBlock
                    title='Разомни мозги'
                    icon='🧩'
                >
                    <BrainTeaser />
                </InfoBlock>

                <InfoBlock
                    title='Звёзды говорят'
                    icon='🔮'
                >
                    <Horoscope />
                </InfoBlock>

                <InfoBlock
                    title='Кадр из Вселенной'
                    icon='📷'
                >
                    <Space />
                </InfoBlock>
            </div>
        </PageWrapper>
    );
}

export default Home;
