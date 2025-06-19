// hooks/useDeviceScale.ts
import { useEffect, useState } from 'react';

export function useDeviceScale() {
    const [scale, setScale] = useState(1);
    const [logicalWidth, setLogicalWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScale(window.devicePixelRatio);
            setLogicalWidth(window.innerWidth);
        };

        handleResize(); // primera vez
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isTVScale: scale === 1.5 && logicalWidth < 1300,
        scale,
        logicalWidth,
    };
}
