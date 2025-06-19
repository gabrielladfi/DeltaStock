/* eslint-disable react/prop-types */
import LayoutOne from '@/Components/Layout/LayoutOne'
import './principalpage.scss'
import NavBar from '@/Components/NavBar'
import ContentDesktop from '@/Components/ContentDesktop'
import LayoutContent from '@/Components/Layout/LayoutContent'
import FooterBasic from '@/Components/FooterBasic'
import MenuMobile from '@/Components/Molecules/MenuMobile'
import ButtonInfo from '@/Components/Atoms/ButtonInfo'
import ButtonPathGuide from '@/Components/Atoms/ButtonPathGuide'
import useVerifyToken from '@/Hooks/useVerifyToken'
import { GlobalState } from '@/Context/GlobalContext'
import { useContext, useEffect } from 'react'
import Modal from '@/Components/Modal'
import BoxAlertNotificationleave from '@/Components/Molecules/BoxAlertNotificationleave'
import { useNavigateProvider } from '@/Hooks/useNavigateProvider'
import warning from '@/assets/warninglogo.svg'
import LayoutTwo from '@/Components/Layout/LayoutTwo'
import MenuConfiguraciones from '@/Components/Molecules/MenuConfiguraciones'
import MenuConsultas from '@/Components/Molecules/MenuConsultas'
import HeaderDeltaCuMobile from '@/Components/Atoms/HeaderDeltaCuMobile'
import NavBarMobilebottom from '@/Components/Molecules/NavBarMobilebottom'
import { getDataUser } from '@/Utils/manejoLocalStorageNumeroRadicacion'
import StatusNavigate from '@/Components/Molecules/StatusNavigate'
import NavVertical from '@/Components/Molecules/NavVertical'
import FooterHelp from '@/Components/Molecules/FooterHelp'

function PrincipalPage({ children, onClick, drivePage, runDriver, handlefnmenu, pathActive, firstpathname, firstpathnameNavigate }) {

    const { abandonandoProceso, setAbandonandoProceso, isOpenMenuConfiguracion, isOpenMenuConsultas } = useContext(GlobalState)
    const { navigateToMenu, navigateToLogin } = useNavigateProvider()

    const checkTokenExpiration = () => {
        const expiration = localStorage.getItem('tokenExpiration');
        if (expiration && Date.now() > Number(expiration)) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          localStorage.removeItem('userData');
          navigateToLogin();
        }
    };

    useEffect(() => {
        checkTokenExpiration();
    }, []);
      

    const { isAuthenticated } = useVerifyToken();

    if (!isAuthenticated) {
        return (
            <div>
                <h1 className='cargando'>Cargando...</h1>
            </div>
        )
    }

    function handleAbandonarProceso() {
        setAbandonandoProceso(false)
        navigateToMenu()
    }

    function handleCancelar() {
        setAbandonandoProceso(false)
    }

    const dataUser = getDataUser()

    return (
        <LayoutOne drivePage={drivePage}>
            <HeaderDeltaCuMobile />
            <NavVertical nameUser={dataUser ? `${dataUser.first_name} ${dataUser.last_name}` : 'Nombre de Pruea'} emailUser={dataUser ? `${dataUser.email}` : 'email@example.com'} initialLetter={dataUser ? `${dataUser.first_name.charAt(0)}` : 'N'} />
            <ContentDesktop>
                <StatusNavigate firstpathname={firstpathname} pathActive={pathActive} firstpathnameNavigate={firstpathnameNavigate} />
                {/*<MenuMobile />*/}
                <LayoutContent>
                    { children }
                </LayoutContent>
            </ContentDesktop>
            <NavBarMobilebottom initialLetter={dataUser ? `${dataUser.first_name.charAt(0)}` : 'N'} />
            {
                abandonandoProceso && (
                    <Modal>
                        <BoxAlertNotificationleave
                            title="¿Estás seguro de abandonar el proceso?"
                            message="Si abandonas el proceso, los datos ingresados no se guardarán."
                            alt="Imagen de alerta"
                            onClick={handleAbandonarProceso}
                            textButton="Abandonar"
                            textButton2="Cancelar"
                            onClickCancel={handleCancelar}
                            image={warning}
                        />
                    </Modal>
                )
            }
            {
                isOpenMenuConsultas &&
                <Modal>
                    <MenuConsultas/>
                </Modal>
            }
            {
                isOpenMenuConfiguracion &&
                <Modal>
                    <MenuConfiguraciones />
                </Modal>
            }
        </LayoutOne>
    )
}

export default PrincipalPage
