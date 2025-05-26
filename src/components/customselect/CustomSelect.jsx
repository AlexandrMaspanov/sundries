import Select from 'react-select';
import styles from './CustomSelect.module.css';

const CustomSelect = ({ options, onChange, value, placeholder, isLoading, noOptionsMessage, onInputChange }) => {
    return (
        <Select
            options={options}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            isLoading={isLoading}
            noOptionsMessage={noOptionsMessage}
            onInputChange={onInputChange}
            className={styles.select}
            classNamePrefix="react-select"
        />
    );
}

export default CustomSelect;
