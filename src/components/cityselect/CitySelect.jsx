import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import CustomSelect from '../customselect/CustomSelect';

const CitySelect = ({ value, onChange, onCityChange }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCities = async (inputValue) => {
        if (!inputValue || inputValue.length < 3) return setOptions([]);

        setLoading(true);

        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}&sort=-population`);
            const data = await res.json();

            setOptions(
                data.map(city => ({
                    value: `${city.lat},${city.lon}`,
                    label: city.display_name,
                }))
            );
        } catch (e) {
            console.error('Ошибка загрузки городов: ', e);
            setOptions([]);
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
            const [lat, lon] = selectedOption.value.split(',');
            onCityChange({lat, lon });
            onChange(selectedOption.label);

            localStorage.setItem('savedCity', selectedOption.label);
            localStorage.setItem('savedCoordinates', JSON.stringify({lat, lon}));
        } else {
            onCityChange(null);
            onChange('');

            localStorage.removeItem('savedCity');
            localStorage.removeItem('savedCoordinates');
        }
    };

    return (
        <CustomSelect
            value={value}
            options={options}
            onChange={handleChange}
            onInputChange={handleInputChange}
            placeholder='Введите город...'
            isLoading={loading}
            noOptionsMessage={() => 'Нет результатов'}
        />
    );
}

export default CitySelect;
