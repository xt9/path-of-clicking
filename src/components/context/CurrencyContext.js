import React, { useReducer, useEffect } from 'react';
import { reducer, defaults } from '../../hooks/useCurrency';

const CurrencyContext = React.createContext();
const storedState = JSON.parse(window.localStorage.getItem('currency'));

const CurrencyProvider = ({ children }) => {
    /* 
        Init state with either defaults or the previous state from localStorage 
        defaults live in the custom hook file for ease of reference.
    */
    const [state, dispatch] = useReducer(reducer, storedState !== null ? storedState : defaults);

    useEffect(() => {
        /* Save to localstorage when context unmounts */
        return () => window.localStorage.setItem('currency', JSON.stringify(state));
    });

    return (
        <CurrencyContext.Provider value={[state, dispatch]}>
            {children}
        </CurrencyContext.Provider>
    );
};

export { CurrencyContext, CurrencyProvider };