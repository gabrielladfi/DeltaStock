/* eslint-disable react/prop-types */
//import { valorInicialMatriculaProfesionales } from '@/Utils/dataInputsNuevaRadicacion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import './listadomatriculaprofesionales.scss'
import { useState } from 'react';



function ListadoMatriculaProfesionales({ handleCheckboxChangeRequisitos, tareasCompletadas, dataInicial, propTitleList, functionAddNoAplica }) {

    const [noAplicaItems, setNoAplicaItems] = useState([]);

    const handleNoAplicaClick = (item) => {
        functionAddNoAplica(item);
        if (noAplicaItems.includes(item.num)) {
            setNoAplicaItems(noAplicaItems.filter(num => num !== item.num));
        } else {
            setNoAplicaItems([...noAplicaItems, item.num]);
            // Deseleccionar el checkbox
            handleCheckboxChangeRequisitos({
                target: {
                    value: JSON.stringify(item),
                    checked: false,
                    name: item.titulo
                }
            });
        }
    };

    return (
        <>
        <section className='listado-documentos-section'>
                <div className='listado-documentos-section__title'>
                    <span className='listado-documentos-section__title__span'>Si aplica / No aplica</span>
                    <span className='listado-documentos-section__title__span-requisito'>Nombre del requisito</span>
                    <span className='listado-documentos-section__title__span'>Estado</span>
                </div>
                {dataInicial?.map((item) => (
                    <article key={item.num} className="listado-documentos-section__article">
                        <div className='listado-documentos-section__article__div-header'>
                            <span className='listado-documentos-section__article__div-header__span'>Aplica / No aplica</span>
                            <button className={`listado-documentos-section__article__div-header__button ${!noAplicaItems.includes(item.num) ? 'button-aplica' : 'button-no-aplica' }`} onClick={() => handleNoAplicaClick(item)}>
                            </button>
                        </div>
                        <div className='listado-documentos-section__article__div-content'>
                            
                            <label
                                className={`input-checkbox__label label-lmp ${noAplicaItems.includes(item.num) ? 'tachado' : ''}`}
                                htmlFor={`checkbox-${item.num}`}
                            
                            >
                                {item.titulo}
                            </label>
                        </div>
                        <div className='listado-documentos-section__article__div-footer'>
                            {!noAplicaItems.includes(item.num) && (
                                <button className={`listado-documentos-section__article__div-footer__button ${tareasCompletadas.includes(item.titulo) ? 'button-entregado' : 'button-no-entregado'}`} name={item.titulo} onClick={() => handleCheckboxChangeRequisitos(item)}>
                                    {tareasCompletadas.includes(item.titulo) ? 'Entregado' : 'No entregado'}
                                </button>
                            )}
                        </div>
                        {/*<input
                                    onChange={handleCheckboxChangeRequisitos}
                                    value={JSON.stringify(item)}
                                    checked={tareasCompletadas.includes(item.titulo)}
                                    className='input-checkbox__input'
                                    type="checkbox"
                                    name={item.titulo}
                                    id={`checkbox-${item.num}`}
                                />*/}
                        
                    </article>
                ))}
        </section>
        </>
    );
}

export default ListadoMatriculaProfesionales;
