import React, { createContext, useContext, useState } from 'react';

// Create a new context with a default value
const AppContext = createContext(null);

const defaultAppState = {
    components: {
        index: [
            { type: 'ContactForm', props: {} },
            {
                type: 'HeadingWith4IconsAndArrows',
                props: {
                    title: 'string',
                    icon: [{ icon: 'test' }]
                }
            },
            {
                type: 'HeadingWith6Icons',
                props: { title: 'string', icon: [] }
            }
        ]
    }
}


export const AppContextProvider = ({ children }) => {
    const componentsList = JSON.parse(localStorage.getItem('componentsList')) || defaultAppState.components.index;
    defaultAppState.components.index = componentsList;
    const [appState, setState] = useState(defaultAppState);

    const updateComponentIndex = (components) => {
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