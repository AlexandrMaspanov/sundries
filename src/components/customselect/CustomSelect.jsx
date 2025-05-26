import Select from 'react-select';
import styles from './CustomSelect.module.css';

const CustomSelect = ({ options, onChange, value, placeholder }) => {
    return (
        <Select
            options={options}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={styles.select}
            classNamePrefix="react-select"
        />
    );
}

export default CustomSelect;
