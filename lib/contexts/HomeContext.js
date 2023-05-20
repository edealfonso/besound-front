import React, { createContext, useState } from 'react';

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [searchString, setSearchString] = useState(false);

    return (
        <HomeContext.Provider
            value={{
                searchString,
                setSearchString
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};
