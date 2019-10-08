import React, { useReducer, useEffect } from 'react';
import { reducer, defaults } from '../../hooks/useCurrency';

const CurrencyContext = React.createContext();

const shouldSaveState = true;
const storedState = shouldSaveState ? JSON.parse(window.localStorage.getItem('currency')) : null;

const CurrencyProvider = ({ children }) => {
    /* 
        Init state with either defaults or the previous state from localStorage 
        defaults live in the custom hook file for ease of reference.
    */
    const [state, dispatch] = useReducer(reducer, storedState !== null ? storedState : defaults);

    const onUnload = () => {
        /* Save to localstorage when page unloads */
        window.localStorage.setItem('currency', JSON.stringify(state));
    };

    useEffect(() => {
        window.addEventListener('beforeunload', onUnload);
        return () => {
            window.removeEventListener('beforeunload', onUnload);
        };
    });

    return (
        <CurrencyContext.Provider value={[state, dispatch]}>
            {children}
        </CurrencyContext.Provider>
    );
};

export { CurrencyContext, CurrencyProvider };