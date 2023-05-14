import React, { createContext, useEffect, useState } from 'react';

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
                recordPageStaticData,
                setRecordPageStaticData,
                recordingStep,
                setRecordingStep
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
