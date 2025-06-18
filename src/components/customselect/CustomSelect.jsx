import Select from 'react-select';
import styles from './CustomSelect.module.css';

const CustomSelect = (props) => {
    return (
        <Select
            {...props}
            isClearable
            classNamePrefix="custom"
        />
    );
}

export default CustomSelect;
