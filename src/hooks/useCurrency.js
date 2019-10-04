/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import { useContext } from 'react';
import produce from "immer";

import { CurrencyContext } from '../components/context/CurrencyContext';

const defaults = {
    exaltedOrbs: {
        id: 'exaltedOrbs',
        name: 'Exalted Orb',
        namePlural: 'Exalted Orbs',
        conversionCost: 1000,
        conversionTarget: 'NOT_SET',
        amount: 0
    },
    chaosOrbs: {
        id: 'chaosOrbs',
        name: 'Chaos Orb',
        namePlural: 'Chaos Orbs',
        conversionCost: 150,
        conversionTarget: 'exaltedOrbs',
        amount: 0
    },
    alchemyOrbs: {
        id: 'alchemyOrbs',
        name: 'Orb of Alchemy',
        namePlural: 'Orbs of Alchemy',
        conversionCost: 4,
        conversionTarget: 'chaosOrbs',
        amount: 0

    }
};

const reducer = (state, action) => {
    /* https://immerjs.github.io/immer/docs/return */
    return produce(state, draft => {
        switch (action.type) {
            case 'INCREMENT':
                draft[action.id].amount += action.amount;
                return;
            case 'DECREMENT':
                draft[action.id].amount -= action.amount;
                return;
        }
    });
};

const useCurrency = () => {
    const [state, dispatch] = useContext(CurrencyContext);

    function getCurrencyByKey(currency) {
        return state[currency];
    }

    function getConversionTarget(currency) {
        return getCurrencyByKey(currency.conversionTarget);
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
        dispatch({ type: 'DECREMENT', id: currency.id, amount: amount });
    }

    function incrementCurrency(currency, amount) {
        dispatch({ type: 'INCREMENT', id: currency.id, amount: amount });
    }

    return {
        currency: state,
        getCurrencyByKey,
        getConversionTarget,
        incrementCurrency,
        decrementCurrency,
        canConvertCurrency,
        convertCurrency
    };
};

export default useCurrency;

export { defaults, reducer };