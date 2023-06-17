import { useEffect } from 'react';

export function useKeyPress(callback, dependencies = []) {
    useEffect(() => {
        window.addEventListener('keydown', callback);

        return () => {
            window.removeEventListener('keydown', callback);
        };
    }, [...dependencies, callback]);
}
