import { LoginProvider } from './Context/LoginContext'
import logodeltacumobile from '../../assets/logos/logodeltaCumobile.png'
import logodeltacutablet from '../../assets/logos/logodeltacuTablet.png'
import logodeltacuDecktop from '../../assets/logos/logodeltacudesktop.svg'
import FormLogin from './Components/FormLogin'
import './login.scss'


function Login() {
    return (
        <>
            <LoginProvider>
                <LoginContent />
            </LoginProvider>
        </>
    )
}

function LoginContent() {    

    return (
        <>
            <div className='login'>
                <article className='login__article-img'></article>
                <article className='login__article-logo'>
                    <div className='login__article-logo__form'>
                        <img className='login__article-logo__form__logo-tablet' src={logodeltacutablet} alt="logo de deltacu" />
                        <img className='login__article-logo__form__logo-desktop' src={logodeltacuDecktop} alt="logo de deltacu" />
                        <h1 className='login__article-logo__form__h1'>Inicia Sesión</h1>
                        <p className='login__article-logo__form__p'>Ingresa tus credenciales para acceder a tu cuenta</p>
                        
                        <FormLogin />
                        
                    </div>
                    <img className='login__article-logo__logo' src={logodeltacumobile} alt="logo de deltacu" />
                </article>
            </div>
        </>
    )
}

export default Login
