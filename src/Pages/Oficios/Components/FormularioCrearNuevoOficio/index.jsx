import PrimaryButton from '../../../../Components/PrimaryButton';
import SectionCloserFormsModal from '../../../../Components/SectionCloserFormsModal'
import SectionShowNumeroRadicacion from '../../../../Components/SectionShowNumeroRadicacion';
import { getNumeroRadicacion } from '../../../../Utils/manejoLocalStorageNumeroRadicacion';
import { useCerrarModalNuevoOficio } from '../../Hooks/useCerrarModalNuevoOficio';
import './formulariocrearnuevooficio.scss'

function FormularioCrearNuevoOficio() {

    const { cerrarModalNuevoOficio } = useCerrarModalNuevoOficio();
    const numeroRadicacion = getNumeroRadicacion();

    return (
        <div className='formulariocrearnuevooficio--container'>
            <SectionCloserFormsModal titleForm={'Registro En Ventanilla Única'} functionOnclick={cerrarModalNuevoOficio} />
            <SectionShowNumeroRadicacion propNumeroRadicacion={numeroRadicacion} />

            <section className='nuevaradicacion-genarales formulario-crear-nueva-observacion-inputs'>
                        <article className='nuevaradicacion-genarales__article agregarrequisito--body formulario-crear-nueva-observacion-inputs'>
                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Nombre Completo</label>
                                <input
                                    
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='nombre'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Fecha</label>
                                <input 
                                    
                                    className='input-base__input agregarrequisito--input' 
                                    type="date" 
                                    name='fecha'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Tipo de tramite</label>
                                <input
                                    
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='email'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Asunto</label>
                                <input
                                    
                                    className='input-base__input agregarrequisito--input' 
                                    type="text"
                                    name='phone'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Documentos de Entrada</label>
                                <textarea
                                    placeholder='Nueva observacio al tramite'
                                    className='input-base__input--textarea' 
                                    type="text"
                                    name='phone'
                                />
                            </div>
                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Documentos de Salida</label>
                                <textarea
                                    placeholder='Nueva observacio al tramite'
                                    className='input-base__input--textarea' 
                                    type="text"
                                    name='phone'
                                />
                            </div>

                            <div className='agregarrequisito--form-div'>
                                <label className='input-base__label' htmlFor="">Descripcion</label>
                                <textarea
                                    placeholder='Nueva observacio al tramite'
                                    className='input-base__input--textarea' 
                                    type="text"
                                    name='phone'
                                />
                            </div>

                            
                        </article>
            </section>



            <section className='formulario-crear-nueva-observacion-buttons'>
                <PrimaryButton textButton='Guardar Oficio' />
            </section>
        </div>
    )
}

export default FormularioCrearNuevoOficio
