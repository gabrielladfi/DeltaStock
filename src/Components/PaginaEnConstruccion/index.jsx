
import { useNavigateProvider } from '../../Hooks/useNavigateProvider'
import PrimaryButton from '../PrimaryButton'
import './paginaenconstruccion.scss'

function PaginaEnConstruccion() {

    const { navigateToMenu } = useNavigateProvider();

    return (
        <div className='layout-pagina-contruccion'>
            <div className='pagina-en-construccion'>
                <h1 className='pagina-en-construccion__h1'>🚧 ¡Estamos trabajando en algo increíble! 🚧</h1>
                <p className='pagina-en-construccion__p'>Esta seccion está en construcción para brindarte una mejor experiencia. Pronto estara terminada con contenido actualizado y nuevas funcionalidades.</p>
                <p>¡Gracias por tu paciencia!</p>
                <PrimaryButton propFunction={navigateToMenu}  textButton='Menú principal' />
            </div>
        </div>
    )
}

export default PaginaEnConstruccion
