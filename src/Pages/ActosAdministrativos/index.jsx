import ButtonChat from '../../Components/ButtonChat'
import ContentDesktop from '../../Components/ContentDesktop'
import FooterBasic from '../../Components/FooterBasic'
import LayoutContent from '../../Components/Layout/LayoutContent'
import LayoutOne from '../../Components/Layout/LayoutOne'
import NavBar from '../../Components/NavBar'
import { getNumeroRadicacion } from '../../Utils/manejoLocalStorageNumeroRadicacion'
import { ActosAdministrativosProvider } from './Context/ActosAdministrativosContext'
import PrimaryButton from '../../Components/PrimaryButton'
import './actosadministrativos.scss'
import TablaListadoActosAdministrativos from './Components/TablaListadoActosAdministrativos'

function ActosAdministrativos() {
    return (
        <>
            <ActosAdministrativosProvider>
                <ActosAdministrativosContent />
            </ActosAdministrativosProvider>
        </>
    )
}

function ActosAdministrativosContent() {

    const numeroRadicacion = getNumeroRadicacion();

    return (
        <LayoutOne>
            <NavBar />
            <ContentDesktop>
                <LayoutContent>
                    <section className='global-section-all '>
                        <article className='global-article-between'>
                            <h2 className='global-h2'>Actos Administrativos</h2>
                        </article>
                    </section>
                    <section className='nuevaradicacion-genarales'>
                        <article className='nuevaradicacion-genarales__article liquidacionesexpensas__article--modificado'>
                        <h3 className='nuevaradicacion-genarales__article__h3'>Número Radicación</h3>
                            <p className='nuevaradicacion-genarales__article__p'>{numeroRadicacion}</p>
                        </article>

                        <article className='nuevaradicacion-solicitantes__article actosadministrativos__article--modificador'>
                       
                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Fecha</label>
                                <input 
                                    className='input-base__input' 
                                    type="date" 
                                    name='fecha'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Auto ID</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Resolucion</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Anulado Por:</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>

                            <div className='input-base'>
                                <label className='input-base__label' htmlFor="">Nota Anulacion</label>
                                <input 
                                    className='input-base__input' 
                                    type="text" 
                                    name='nombre_solicitante'
                                />
                            </div>
                            <div className='input-base actosadministrativos__input-base--modificador'>
                                <PrimaryButton textButton={'Enviar'}/>
                            </div>
                        </article>
                    </section>

                    <section className='global-section-all '>
                        <TablaListadoActosAdministrativos />
                    </section>
                </LayoutContent>
                <ButtonChat />
            </ContentDesktop>
            <FooterBasic />
        </LayoutOne>
    )
}

export default ActosAdministrativos
