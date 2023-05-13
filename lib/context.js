import React, { createContext, useState, useEffect } from 'react';
import { getBasketLines } from '../shop/api';
import { useRouter } from 'next/router';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [veil, setVeil] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('logged');
        if (storedUser) {
            setIsAuthenticated(true);
        }

        const handleRouteChange = (url, { shallow }) => {
            // Do something when the URL changes
            console.log(
                `App is changing to ${url} ${
                    shallow ? 'with' : 'without'
                } shallow routing`
            );
            showLoader(true);
            return;
        };

        const handleRouteChangeComplete = (url, { shallow }) => {
            // Do something when the URL changes
            console.log(
                `App is changing to ${url} ${
                    shallow ? 'with' : 'without'
                } shallow routing`
            );
            showLoader(true);
            return;
        };

        // Subscribe to the router's `routeChangeComplete` event
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        // Unsubscribe from the event when the component unmounts
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.pathname]);

    const login = () => {
        sessionStorage.setItem('logged', 'yes');
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('logged');
        setIsAuthenticated(false);
    };

    const toggleVeil = () => {
        setVeil(!veil);
    };

    const contextValues = {
        isAuthenticated,
        login,
        logout,
        toggleVeil,
        veil
    };

    return (
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
