import React, { useReducer } from 'react';
import { reducer, defaults } from '../../hooks/useUpgrades';

const UpgradeContext = React.createContext();

//const storedState = JSON.parse(window.localStorage.getItem('generators'));

const UpgradeProvider = (props) => {
    /* 
        Init state with either defaults or the previous state from localStorage 
        defaults live in the custom hook file for ease of reference.
    */
    const [state, dispatch] = useReducer(reducer, defaults);

    // useEffect(() => {
    /* Save to localstorage when context unmounts */
    // return () => window.localStorage.setItem('generators', JSON.stringify(state));
    // });

    return (
        <UpgradeContext.Provider value={[state, dispatch]}>
            {props.children}
        </UpgradeContext.Provider>
    );
};

export { UpgradeContext, UpgradeProvider };