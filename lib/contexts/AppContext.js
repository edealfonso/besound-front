import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [recordPageStaticData, setRecordPageStaticData] = useState(null);
    const [recordingStep, setRecordingStep] = useState(null);
    const [effect, setEffect] = useState(null);

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                recordPageStaticData,
                setRecordPageStaticData,
                recordingStep,
                setRecordingStep,
                effect,
                setEffect
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
