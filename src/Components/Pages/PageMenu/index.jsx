/* eslint-disable react/prop-types */
import LayoutOne from '@/Components/Layout/LayoutOne'
import './pagemenu.scss'
import NavBar from '@/Components/NavBar'
import ContentDesktop from '@/Components/ContentDesktop'
import MenuMobile from '@/Components/Molecules/MenuMobile'
import SectionMenu from '@/Pages/Menu/Components/SectionMenu'
import FooterBasic from '@/Components/FooterBasic'
import ButtonInfo from '@/Components/Atoms/ButtonInfo'
import useVerifyToken from '@/Hooks/useVerifyToken'
import HeaderDeltaCuMobile from '@/Components/Atoms/HeaderDeltaCuMobile'
import WelcomeNameUser from '@/Components/Atoms/WelcomeNameUser'
import { getDataUser } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import NavBarMobilebottom from '@/Components/Molecules/NavBarMobilebottom'
import NavVertical from '@/Components/Molecules/NavVertical'
import { useContext } from 'react'
import { GlobalState } from '@/Context/GlobalContext'
import Modal from '@/Components/Modal'
import MenuConfiguraciones from '@/Components/Molecules/MenuConfiguraciones'
import MenuConsultas from '@/Components/Molecules/MenuConsultas'

function PageMenu({ children }) {

    const { isOpenMenuConfiguracion, isOpenMenuConsultas } = useContext(GlobalState)

    const { isAuthenticated } = useVerifyToken();

    if (!isAuthenticated) {
        return (
            <div>
                <h1 className='cargando'>Cargando...</h1>
            </div>
        )
    }

    const dataUser = getDataUser()


    return (
        <LayoutOne>
            <HeaderDeltaCuMobile />
            <NavVertical nameUser={dataUser ? `${dataUser.first_name} ${dataUser.last_name}` : 'Nombre de Pruea'} emailUser={dataUser ? `${dataUser.email}` : 'email@example.com'} initialLetter={dataUser ? `${dataUser.first_name.charAt(0)}` : 'N'} />
            <ContentDesktop>
                <WelcomeNameUser nameUser={dataUser ? `${dataUser.first_name}` : 'Nombre de Pruea'} />
                <MenuMobile />
                    <SectionMenu>
                        { children }
                    </SectionMenu>
            </ContentDesktop>
            <NavBarMobilebottom initialLetter={dataUser ? `${dataUser.first_name.charAt(0)}` : 'N'} />
            {
                isOpenMenuConfiguracion &&
                <Modal>
                    <MenuConfiguraciones />
                </Modal>
            }
            {
                isOpenMenuConsultas &&
                <Modal>
                    <MenuConsultas/>
                </Modal>
            }
        </LayoutOne>
    )
}

export default PageMenu
