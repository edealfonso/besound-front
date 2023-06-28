import { useEffect, useState } from 'react';

export function useWindowDimensions(dependencies = []) {
    const [dimensions, setDimensions] = useState({
        height: typeof window !== 'undefined' && window.innerHeight,
        width: typeof window !== 'undefined' && window.innerWidth
    });

    useEffect(() => {
        // set window dimensions
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };

        window.addEventListener('resize', handleResize);
        // if (window.screen?.orientation) {
        //     window.screen.orientation.addEventListener('change', handleResize);
        // } else {
        //     window.addEventListener('orientationchange', handleResize);
        // }
        return () => {
            window.removeEventListener('resize', handleResize);
            // if (window.screen?.orientation) {
            //     window.screen.orientation.removeEventListener(
            //         'change',
            //         handleResize
            //     );
            // } else {
            //     window.removeEventListener('orientationchange', handleResize);
            // }
        };
    }, dependencies);

    return dimensions;
}
