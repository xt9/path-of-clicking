import React, { useState, useEffect } from 'react';
import { defaults } from '../../hooks/useGenerators';

const GeneratorContext = React.createContext();
const storedState = JSON.parse(window.localStorage.getItem('generators'));

const GeneratorProvider = (props) => {
    /* 
        Init state with either defaults or the previous state from localStorage 
        defaults live in the custom hook file for ease of reference.
    */
    const [state, setState] = useState(storedState !== null ? storedState : defaults);

    useEffect(() => {
        /* Save to localstorage when context unmounts */
        return () => window.localStorage.setItem('generators', JSON.stringify(state));
    });

    return (
        <GeneratorContext.Provider value={[state, setState]}>
            {props.children}
        </GeneratorContext.Provider>
    );
};

export { GeneratorContext, GeneratorProvider };