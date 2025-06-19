import PropTypes from 'prop-types';
import { useState, useRef, useEffect, useContext } from 'react'
import './dropdownsearch.scss'
import '../../../../Sass/globalSass.scss'
import { optionsArray } from '../../utils/DataBarrios';
import { GlobalState } from '../../../../Context/GlobalContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

DropdownSearch.propTypes = {
    label: PropTypes.string.isRequired,
}

function DropdownSearch({ label }) {

  const { setValorDropdown, valorDropdown } = useContext(GlobalState);
  const [options] = useState(optionsArray); // Lista de opciones originales
  const [filteredOptions, setFilteredOptions] = useState(optionsArray); // Opciones filtradas
  const [inputValue, setInputValue] = useState(""); // Valor actual del input
  const [selectedValue, setSelectedValue] = useState(""); // Valor seleccionado
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado del dropdown
  
  const containerRef = useRef(null); // Referencia al contenedor para detectar clics fuera

  // Manejar los cambios en el input
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filtrar opciones que coincidan con lo que se escribe
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);

    if (!isDropdownOpen) setIsDropdownOpen(true); // Mostrar el dropdown al escribir
  };

  // Manejar la selección de una opción
  const handleOptionClick = (option) => {
    setSelectedValue(option.name);
    setInputValue(option.name);
    setFilteredOptions(options); // Reiniciar las opciones filtradas
    setIsDropdownOpen(false); // Cerrar el dropdown
  };

  // Manejar el cierre del dropdown al hacer clic fuera
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Efecto para detectar clics fuera del componente
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manejar la apertura del dropdown al hacer clic en el input
  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  // Enviar el valor seleccionado al contexto cuando se actualice
  useEffect(() => {
    setValorDropdown(inputValue); // Cambié selectedValue por inputValue para enviar siempre el valor del input
  }, [inputValue, setValorDropdown]);

  return (
    <div className="dropdown-search-container" ref={containerRef}>
        <label className="dropdown-search-container__label">
            {label}
        </label>
        <div className='dropdown-search-container__div'>
            <input
                id="input-base__input"
                type="text"
                value={valorDropdown}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="Seleccione un barrio"
                className="dropdown-search-container__div__input"
            />
            <ChevronDownIcon className='dropdown-search-container__div__icon' />
        </div>
        {isDropdownOpen && filteredOptions.length > 0 && (
        <ul className="dropdown-search-container__ul">
            {filteredOptions.map((option) => (
            <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="searchable-select-option"
            >
                {option.name}
            </li>
            ))}
        </ul>
        )}
    </div>
  );
}

export default DropdownSearch;
