import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [recordingStep, setRecordingStep] = useState(null);
    const [recordPageStaticData, setRecordPageStaticData] = useState(null);
    const [isFormOK, setIsFormOK] = useState(false);

    return (
        <AppContext.Provider
            value={{
                recordingStep,
                setRecordingStep,
                recordPageStaticData,
                setRecordPageStaticData,
                isFormOK,
                setIsFormOK
            }}
        >
            {children}
        </AppContext.Provider>
    );
};