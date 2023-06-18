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
        screen.orientation.addEventListener('change', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            screen.orientation.removeEventListener('change', handleResize);
        };
    }, dependencies);

    return dimensions;
}
