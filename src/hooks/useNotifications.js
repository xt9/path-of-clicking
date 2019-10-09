/* eslint-disable default-case */
import { useContext } from 'react';
import produce from "immer";

import { NotificationContext } from '../components/context/NotificationContext';

const reducer = produce((draft, action) => {
    /* https://immerjs.github.io/immer/docs/return */
    switch (action.type) {
        case 'ADD':
            draft.push(action.notification);
            return;
        case 'REMOVE':
            draft.splice(action.index, 1);
            return;
        case 'RESET':
            return [];
    }
});

const useNotification = () => {
    const [state, dispatch] = useContext(NotificationContext);

    function addNotification(title, message) {
        dispatch({ type: 'ADD', notification: { title: title, message: message } });
    }

    function removeNotification(id) {
        dispatch({ type: 'REMOVE', id });
    }

    function reset() {
        dispatch({ type: 'RESET' });
    }

    return {
        notifications: state,
        addNotification,
        removeNotification,
        reset
    };
};

export default useNotification;

export { reducer };