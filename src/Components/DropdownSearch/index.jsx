/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, useContext } from "react";
import "./dropdownsearch.scss";
import "../../Sass/globalSass.scss";
import { GlobalState } from "../../Context/GlobalContext";

function DropdownSearch({ dataObject, label }) {
  const { setValorDropdown } = useContext(GlobalState);
  const [filteredOptions, setFilteredOptions] = useState([]); // Opciones filtradas
  const [inputValue, setInputValue] = useState(""); // Valor actual del input
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado del dropdown

  const containerRef = useRef(null); // Referencia al contenedor para detectar clics fuera

  // Extraer las opciones del objeto "categorias"
  useEffect(() => {
    if (dataObject && dataObject.categorias) {
      setFilteredOptions(dataObject.categorias); // Establecer las categorías como opciones iniciales
    }
  }, [dataObject]);

  // Manejar los cambios en el input
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filtrar opciones que coincidan con lo que se escribe
    const filtered = dataObject.categorias.filter((categoria) =>
      categoria.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);

    if (!isDropdownOpen) setIsDropdownOpen(true); // Mostrar el dropdown al escribir
  };

  // Manejar la selección de una opción
  const handleOptionClick = (option) => {
    setInputValue(option);
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
    setValorDropdown(inputValue); // Envía siempre el valor actual del input
  }, [inputValue, setValorDropdown]);

  return (
    <div className="searchable-select-container-atom" ref={containerRef}>
      <label className='searchable-select-container-atom__label' htmlFor="">{label}</label>
      <input
        id="input-base__input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Ingrese una categoría"
        className="searchable-select-container-atom__input"
        autoComplete="off"
      />
      {isDropdownOpen && filteredOptions.length > 0 && (
        <ul className="searchable-select-options">
          {filteredOptions.map((categoria, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(categoria)}
              className="searchable-select-option"
            >
              {categoria}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownSearch;