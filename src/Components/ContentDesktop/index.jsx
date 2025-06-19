/* eslint-disable react/prop-types */
import { useDeviceScale } from '@/Hooks/useDeviceScale'
import './contentdesktop.scss'

function ContentDesktop({children}) {

    const { isTVScale } = useDeviceScale()
    return (
        <div className={isTVScale ? 'contentdesktop-tv' : 'contentdesktop'}>
            {children}
        </div>
    )
}

export default ContentDesktop
