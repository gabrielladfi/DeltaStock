import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import './formlogin.scss'
import { AuthContextState } from '../../../../Context/AuthContextContext';
import { useLogin } from '@/Hooks/useLogin';
import PrimaryButton from '@/Components/PrimaryButton';
function FormLogin() {


    const { dataForm, setDataForm } = useContext(AuthContextState);
    const { doLogin, error } = useLogin(); 
    
    return (
        <form className='formlogin'>
            <div className='formlogin__div'>
                <label className='formlogin__div__label'>Correo *</label>
                <input required autoComplete='off' value={dataForm.email} onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })} className='formlogin__div__input' name='email' placeholder='Correo' type="text" />
            </div>
            <div className='formlogin__div'>
                <label className='formlogin__div__label'>Contraseña *</label>
                <input required autoComplete='off' value={dataForm.password} onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })} className='formlogin__div__input' name='Contraseña*' placeholder='Contraseña' type="password" />
                {
                    error ?

                    <div className='formlogin__div__error'>
                        <ExclamationCircleIcon className='formlogin__div__error__icon'/>
                        <p className='formlogin__div__error__p'>Las credenciales ingresadas no son validas.</p>
                    </div>
                    :
                    null

                }
                <p className='formlogin__div__p'>¿Olvidaste tu contraseña?</p>
                
            </div>
            <PrimaryButton className='formlogin__button' textButton={'Iniciar'} propFunction={doLogin} />
        </form> 
    )
}

export default FormLogin
