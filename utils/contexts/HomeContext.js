import React, { createContext, useState } from 'react';

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [searchString, setSearchString] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <HomeContext.Provider
            value={{
                searchString,
                setSearchString,
                isSearchOpen,
                setIsSearchOpen
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};
