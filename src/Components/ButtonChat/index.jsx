import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import './buttonchat.scss'
import { useDeviceScale } from '@/Hooks/useDeviceScale'

function ButtonChat() {

    const { isTVScale } = useDeviceScale()

    return (
        <button className={isTVScale ? 'buttonchat-tv' : 'buttonchat'}>
            <ChatBubbleOvalLeftEllipsisIcon className={isTVScale ? 'buttonchat-tv__icon' : 'buttonchat__icon'} />
            <p className={isTVScale ? 'buttonchat-tv__p' : 'buttonchat__p'}>¡Vamos a chatear!</p>

        </button>
    )
}

export default ButtonChat
