import React, { createContext, useState } from 'react';

export const RecordContext = createContext();

export const RecordProvider = ({ children }) => {
    const [effect, setEffect] = useState(null);
    const [title, setTitle] = useState(null);

    return (
        <RecordContext.Provider
            value={{
                effect,
                setEffect,
                title,
                setTitle
            }}
        >
            {children}
        </RecordContext.Provider>
    );
};
