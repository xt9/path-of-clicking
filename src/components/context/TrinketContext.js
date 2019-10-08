import React, { useReducer, useEffect } from 'react';
import { reducer, defaults } from '../../hooks/useTrinkets';

const TrinketContext = React.createContext();

const shouldSaveState = true;
const storedState = shouldSaveState ? JSON.parse(window.localStorage.getItem('trinkets')) : null;

const TrinketProvider = (props) => {
    /* 
        Init state with either defaults or the previous state from localStorage 
        defaults live in the custom hook file for ease of reference.
    */
    const [state, dispatch] = useReducer(reducer, storedState !== null ? storedState : defaults);

    const onUnload = () => {
        /* Save to localstorage when page unloads */
        window.localStorage.setItem('trinkets', JSON.stringify(state));
    };

    useEffect(() => {
        window.addEventListener('beforeunload', onUnload);
        return () => {
            window.removeEventListener('beforeunload', onUnload);
        };
    });

    return (
        <TrinketContext.Provider value={[state, dispatch]}>
            {props.children}
        </TrinketContext.Provider>
    );
};

export { TrinketContext, TrinketProvider };