import logo from '../../assets/logosvg.svg'
import './footerbasic.scss'
import { useDeviceScale } from '@/Hooks/useDeviceScale';
import useLogout from '@/Hooks/useLogout';

function FooterBasic() {

    const { isTVScale } = useDeviceScale()          
    const { doLogout } = useLogout();



    return (
        <footer className={isTVScale ? 'footerbasic-tv' : 'footerbasic'}>
            <img className={isTVScale ? 'footerbasic-tv__img' : 'footerbasic__img'} src={logo} alt="logo" />
            <button onClick={doLogout} className={isTVScale ? 'footerbasic-tv__button-cerrar-sesion' : 'footerbasic__button-cerrar-sesion'}>Cerrar Sesion</button>
        </footer>
    )
}

export default FooterBasic
