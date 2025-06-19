import { XMarkIcon } from '@heroicons/react/24/outline'
import './registraringreso.scss'
import { useContext } from 'react';
import { GlobalState } from '../../../../Context/GlobalContext';
import { EstadoRequisitosContextState } from '../../Context/EstadoRequisitosContextContext';

function RegistrarIngreso() {

    const { dataTramite } = useContext(GlobalState);
    const { setRegistrarNuevoIngreso } = useContext(EstadoRequisitosContextState);

    function handleClose() {
        setRegistrarNuevoIngreso(false);
    }

    return (
        <>
            <div className='registraringreso-container'>
                <section className='registraringreso-container__close'>
                    <button onClick={handleClose} className='registraringreso-container__close__button'><XMarkIcon className='registraringreso-container__close__button__icon' /></button>
                </section>
                <section className='registraringreso-container__header'>
                    <h2 className='global-h2'>Registro Oficios En Ventanilla</h2>
                    <div className='registraringreso-container__header__info'>
                        <p>numero de radicacion:</p>
                        <span>{dataTramite.numero_radicacion}</span>
                    </div>
                </section>
                <section className='nuevaradicacion-genarales '>
                        <article className='nuevaradicacion-genarales__article registraringreso--body'>
                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Nombre Completo</label>
                                <input
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='requisito_title'
                                />
                            </div>

                            <div className=' agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Asunto</label>
                                <input
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='descripcion'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Fecha</label>
                                <input 
                                    className='input-base__input agregarrequisito--input' 
                                    type="date" 
                                    name='fecha_creacion'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Tipo de tramite</label>
                                <input
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='descripcion_pendiente'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Documentos de Entrada</label>
                                <textarea placeholder='Nueva observacion al tramite' className='registraringreso--textarea' name="" id=""></textarea>
                                
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Documentos De Salida</label>
                                <textarea placeholder='Nueva observacion al tramite' className='registraringreso--textarea' name="" id=""></textarea>
                                
                            </div>

                            <div className='agregarrequisito--form-div-big'>
                                <label className='input-base__label' htmlFor="">Descripcion</label>
                                <textarea placeholder='Nueva observacion al tramite' className='registraringreso--textarea-big' name="" id=""></textarea>
                                
                            </div>

                            

                        </article>
                    </section>
                    <section className='registraringreso-container__buttons'>
                        <button className='global-button-save'>Registrar Ingreso</button>
                    </section>
                
            </div>
        </>
    )
}

export default RegistrarIngreso
