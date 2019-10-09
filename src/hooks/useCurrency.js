/* eslint-disable default-case */
import { useContext } from 'react';
import produce from "immer";

import { CurrencyContext } from '../components/context/CurrencyContext';

const defaults = [
    {
        id: 'mirror',
        name: 'Mirror of Kalandra',
        namePlural: 'Mirrors of Kalandra',
        conversionCost: 1,
        conversionTarget: null,
        amount: 0
    },
    {
        id: 'exaltedOrbs',
        name: 'Exalted Orb',
        namePlural: 'Exalted Orbs',
        conversionCost: 1000,
        conversionTarget: 'mirror',
        amount: 0
    },
    {
        id: 'chaosOrbs',
        name: 'Chaos Orb',
        namePlural: 'Chaos Orbs',
        conversionCost: 150,
        conversionTarget: 'exaltedOrbs',
        amount: 0
    },
    {
        id: 'alchemyOrbs',
        name: 'Orb of Alchemy',
        namePlural: 'Orbs of Alchemy',
        conversionCost: 4,
        conversionTarget: 'chaosOrbs',
        amount: 3

    }
];

const reducer = produce((draft, action) => {
    /* https://immerjs.github.io/immer/docs/return */
    switch (action.type) {
        case 'INCREMENT':
            draft[action.id].amount += action.amount;
            return;
        case 'DECREMENT':
            draft[action.id].amount -= action.amount;
            return;
        case 'RESET':
            return defaults;
    }
});

const useCurrency = () => {
    const [state, dispatch] = useContext(CurrencyContext);

    function getIndexById(id) {
        return state.findIndex(obj => obj.id === id);
    }

    function getCurrencyById(id) {
        return state[getIndexById(id)];
    }

    function getConversionTarget(currency) {
        return getCurrencyById(currency.conversionTarget);
    }

    function canConvertCurrency(fromCurrency, numOfConversions) {
        return fromCurrency.amount >= fromCurrency.conversionCost * numOfConversions;
    }

    function convertCurrency(fromCurrency, numOfConversions) {
        if (canConvertCurrency(fromCurrency, numOfConversions)) {
            decrementCurrency(fromCurrency, fromCurrency.conversionCost * numOfConversions);
            incrementCurrency(getConversionTarget(fromCurrency), numOfConversions);
        }
    }

    function decrementCurrency(currency, amount) {
        dispatch({ type: 'DECREMENT', id: getIndexById(currency.id), amount: amount });
    }

    function incrementCurrency(currency, amount) {
        dispatch({ type: 'INCREMENT', id: getIndexById(currency.id), amount: amount });
    }

    function reset() {
        dispatch({ type: 'RESET' });
    }

    return {
        currency: state,
        getCurrencyById,
        getConversionTarget,
        incrementCurrency,
        decrementCurrency,
        canConvertCurrency,
        convertCurrency,
        dispatch,
        reset
    };
};

export default useCurrency;

export { defaults, reducer };