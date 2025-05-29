import packageJson from '../../package.json';

const Version = () => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '0.5rem',
            right: '0.5rem',
            background: '#eee',
            padding: '0.3rem 0.6rem',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            opacity: 0.7
        }}>
            Версия: {packageJson.version}
        </div>
    );
}

export default Version;