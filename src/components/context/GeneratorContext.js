import React, { useReducer, useEffect } from 'react';
import { reducer, defaults } from '../../hooks/useGenerators';

const GeneratorContext = React.createContext();

const shouldSaveState = true;
const storedState = shouldSaveState ? JSON.parse(window.localStorage.getItem('generators')) : null;

const GeneratorProvider = ({ children }) => {
    /* 
        Init state with either defaults or the previous state from localStorage 
        defaults live in the custom hook file for ease of reference.
    */
    const [state, dispatch] = useReducer(reducer, storedState !== null ? storedState : defaults);

    const onUnload = () => {
        /* Save to localstorage when page unloads */
        window.localStorage.setItem('generators', JSON.stringify(state));
    };

    useEffect(() => {
        window.addEventListener('beforeunload', onUnload);
        return () => {
            window.removeEventListener('beforeunload', onUnload);
        };
    });

    return (
        <GeneratorContext.Provider value={[state, dispatch]}>
            {children}
        </GeneratorContext.Provider>
    );
};

export { GeneratorContext, GeneratorProvider };