import { useNoInicioSesion } from '@/Hooks/useNoInicioSesion';
import './layoutone.scss'
import Cargando from '@/Components/Atoms/Cargando';
import { getDataUser } from '@/Utils/manejoLocalStorageNumeroRadicacion';
import { useContext, useEffect } from 'react';
import { AuthContextState } from '@/Context/AuthContextContext';

// eslint-disable-next-line react/prop-types
function LayoutOne({children, drivePage}) {

    const { setToken } = useContext(AuthContextState)

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [])

    const user = getDataUser();

    console.log('user', user.usertype)

    const { isLoading } = useNoInicioSesion();
    //const { isLoadingEstandar } = useAccesoLimitadoestandar();
    
        if (isLoading) return <Cargando />;
        //if (isLoadingEstandar) return <div>Cargando...</div>;

    return (
        <div className={`layoutone ${drivePage}`}>
            {children}
        </div>
    )
}

export default LayoutOne
