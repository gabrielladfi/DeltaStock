/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, useContext } from 'react';
import './dropdownsearch.scss';
import '@/Sass/globalSass.scss';
import { useFetchGet } from '@/Hooks/useFetchGet';
import { AuthContextState } from '@/Context/AuthContextContext';
import { urlBase, urlGetTodoLosTramites } from '@/Utils/UrlData';

function DropdownSearch({ propFnInput, propValue, propAddNumRadicaciondd, isLabel = true }) {
  const { token } = useContext(AuthContextState);
  const { dataGet } = useFetchGet(token, `${urlBase}${urlGetTodoLosTramites}`, '');

  function transformData(data) {
    return data.map((item) => ({
      id: item.id,
      name: item.numero_radicacion
    }));
  }

  const optionsArray = dataGet ? transformData(dataGet) : [];

  const [filteredOptions, setFilteredOptions] = useState(optionsArray); // Opciones filtradas
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado del dropdown
  const [inputValue, setInputValue] = useState(propValue); // Valor del input

  const containerRef = useRef(null); // Referencia al contenedor para detectar clics fuera

  // Actualizar las opciones cuando dataGet esté disponible
  useEffect(() => {
    if (dataGet) {
      const transformedData = transformData(dataGet);
      setFilteredOptions(transformedData);
    }
  }, [dataGet]);

  // Manejar los cambios en el input
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value); // Actualizar el valor del input
    propFnInput(event); // Llamar a la función propFnInput para actualizar el valor en el componente padre

    // Filtrar opciones que coincidan con lo que se escribe
    const filtered = optionsArray.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);

    if (!isDropdownOpen) setIsDropdownOpen(true); // Mostrar el dropdown al escribir
  };

  // Manejar la selección de una opción
  const handleOptionClick = (option) => {
    console.log(option);
    setInputValue(option.name); // Actualizar el valor del input
    propAddNumRadicaciondd(option.name); // Llamar a la función propAddNumRadicaciondd para actualizar el valor en el componente padre
    setFilteredOptions(optionsArray); // Reiniciar las opciones filtradas
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

  return (
    <div className='dropdown-search-container' ref={containerRef}>
        <label className='dropdown-search-container__label' htmlFor='numero_radicacion'>Numero de radicación</label>
      <div className="dropdown-search-container__div" >
        <input
          id="dropdownsearch-container__input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Seleccionar opcion"
          className="dropdown-search-container__div__input"
          autoComplete='off'
          name='numero_radicacion'
        />
        
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