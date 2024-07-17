import React, { createContext, useContext, useState } from 'react';

// Create a new context with a default value
const AppContext = createContext(null);

const defaultAppState = {
    components: { index: null }
}

export const AppContextProvider = ({ children }) => {
    defaultAppState.components.index = JSON.parse(localStorage.getItem('componentsList')) || null;
    const [appState, setState] = useState(defaultAppState);

    const updateComponentIndex = (components) => {
        console.log('Updating component index:', components);
        localStorage.setItem('componentsList', JSON.stringify(components));
        setState(prev => ({ ...prev, components: { index: components } }));
    }

    return (
        <AppContext.Provider value={{ appState, updateComponentIndex }}>
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook to use the new context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider');
    }
    return context;
};