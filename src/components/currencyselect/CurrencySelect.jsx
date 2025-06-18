import CustomSelect from '../customselect/CustomSelect';
import styles from './CurrencySelect.module.css';

const CurrencySelect = ({ selected, setSelected, allCurrencies }) => {
    const options = allCurrencies
        .filter(code => !selected.includes(code))
        .map(code => ({ value: code, label: code })
        );

    const handleChange = (selectedOption) => {
        if (!selectedOption) return;

        const newCode = selectedOption.value;

        const updated = [newCode, ...selected].slice(0, 3);

        setSelected(updated);
    }

    const getOptionLabel = ({ value, label }) => {
        const flagCode = value.slice(0, 2).toLowerCase();

        return (
            <div className={styles.option}>
                {flagCode ? (
                    <span className={`flag-icon flag-icon-${flagCode} ${styles.flag}`} />
                ) : (
                    <span className={styles.fallbackFlag}>🌐</span>
                )}
                <span>{label}</span>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <CustomSelect
                options={options}
                onChange={handleChange}
                placeholder='Выберите валюту'
                getOptionLabel={getOptionLabel}
            />
        </div>
    );
}

export default CurrencySelect;
