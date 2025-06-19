import { PropTypes } from 'prop-types'
import fileicon from '@/assets/icons/fileicon.svg'
import papericon from '@/assets/icons/papericon.svg'
import machineicon from '@/assets/icons/machineicon.svg'
import './navbarmobilebottom.scss'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import { Bars3Icon, HomeIcon } from '@heroicons/react/24/outline'

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
            <button onClick={() => setIsOpenMenuConfiguracion(true)} className='navbarmobilebottom__button'>
                <Bars3Icon className='navbarmobilebottom__button__icon' />
            </button>
            <button onClick={navigateToNuevaRadicacion} className='navbarmobilebottom__button'>
                <HomeIcon className='navbarmobilebottom__button__icon' />
            </button>
            
            <button className='navbarmobilebottom__button--perfil'>
                { initialLetter }
            </button>
        </nav>
    )
}

export default NavBarMobilebottom
