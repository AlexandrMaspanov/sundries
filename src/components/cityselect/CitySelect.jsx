import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { API_KEYS } from '../../config';
import CustomSelect from '../customselect/CustomSelect';

const CitySelect = ({ onCityChange }) => {
    const key = API_KEYS.weather;
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCities = async (inputValue) => {
        if (!inputValue || inputValue.length < 3) return setOptions([]);

        setLoading(true);
        try {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${key}`);
            const data = await res.json();

            setOptions(
                data.map(city => ({
                    value: `${city.lat},${city.lon}`,
                    label: `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`,
                    full: city.name,
                }))
            );
        } catch (e) {
            setOptions([]);
            console.error(e);
        }
        setLoading(false);
    };

    // Дебаунсим запрос, чтобы не вызывать API на каждый символ
    const debouncedFetchCities = useCallback(debounce(fetchCities, 500), []);

    const handleInputChange = (inputValue) => {
        debouncedFetchCities(inputValue);
    };

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            onCityChange(selectedOption.full);
        }
    };

    return (
        <CustomSelect
            options={options}
            onChange={handleChange}
            placeholder='Введите город...'
            isLoading={loading}
            noOptionsMessage={() => 'Нет результатов'}
            onInputChange={handleInputChange}
        />
    );
}

export default CitySelect;
