import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [recordingStep, setRecordingStep] = useState(null);
    const [recordPageStaticData, setRecordPageStaticData] = useState(null);

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                recordingStep,
                setRecordingStep,
                recordPageStaticData,
                setRecordPageStaticData
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
