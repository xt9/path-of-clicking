import React, { useReducer } from 'react';
import { reducer } from '../../hooks/useNotifications';

const NotificationContext = React.createContext();

const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <NotificationContext.Provider value={[state, dispatch]}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext, NotificationProvider };