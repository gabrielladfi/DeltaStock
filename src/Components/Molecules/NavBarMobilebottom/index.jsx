import { PropTypes } from 'prop-types'
import fileicon from '@/assets/icons/fileicon.svg'
import papericon from '@/assets/icons/papericon.svg'
import machineicon from '@/assets/icons/machineicon.svg'
import './navbarmobilebottom.scss'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'

NavBarMobilebottom.propTypes = {
    initialLetter: PropTypes.string.isRequired,
}

function NavBarMobilebottom({ initialLetter }) {

    const { setIsOpenMenuConfiguracion, setIsOpenMenuConsultas } = useContext(GlobalState);

    const { 
        navigateToNuevaRadicacion, 
    } = useNavigateProvider()

    return (
        <nav className='navbarmobilebottom'>
            <button onClick={navigateToNuevaRadicacion} className='navbarmobilebottom__button'>
                <img src={fileicon} alt="fileicon" />
            </button>
            <button onClick={() => setIsOpenMenuConsultas(true)} className='navbarmobilebottom__button'>
                <img src={papericon} alt="papericon" />
            </button>
            <button onClick={() => setIsOpenMenuConfiguracion(true)} className='navbarmobilebottom__button'>
                <img src={machineicon} alt="machineicon" />
            </button>
            <button className='navbarmobilebottom__button--perfil'>
                { initialLetter }
            </button>
        </nav>
    )
}

export default NavBarMobilebottom
