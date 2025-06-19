/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { GlobalState } from '@/Context/GlobalContext';
import './layoutcontent.scss'

function LayoutContent({children}) {

    const { isOpenMenuMobile } = useContext(GlobalState);


    return (
        <>
            <section className={`layoutcontent ${isOpenMenuMobile ? 'layoutcontent--menumobile-open' : ''}`}>
                {children}
            </section>
        </>
    )
}

export default LayoutContent
