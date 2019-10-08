/* eslint-disable default-case */
import { useContext } from 'react';
import produce from "immer";

import { GeneratorContext } from '../components/context/GeneratorContext';

import useCurrency from "./useCurrency";
import useUpgrades from "./useUpgrades";

const defaults = [
    {
        id: 'outpost',
        amount: 0,
        defaultCost: 4,
        defaultGeneration: 1.5,
        priceUnit: 'chaosOrbs',
        generationUnit: 'alchemyOrbs',
        name: 'Outpost',
        namePlural: 'Outposts',
        lore: 'Outposts will raid nearby areas for currency.'
    },
    {
        id: 'shadyMerchant',
        amount: 0,
        defaultCost: 8,
        defaultGeneration: 1,
        priceUnit: 'chaosOrbs',
        generationUnit: 'chaosOrbs',
        name: 'Shady Merchant',
        namePlural: 'Shady Merchants',
        lore: 'Shady Merchants will scam passerbys of their hard-earned currency.'
    },
    {
        id: 'mapDevice',
        amount: 0,
        defaultCost: 1,
        defaultGeneration: 2,
        priceUnit: 'mirror',
        generationUnit: 'exaltedOrbs',
        name: 'Map Device',
        namePlural: 'Map Devices',
        lore: 'Map devices will open up portals into distant lands filled to the brim with riches.'
    }
];

const reducer = produce((draft, action) => {
    switch (action.type) {
        case 'INCREMENT':
            draft[action.id].amount++;
            return;
        case 'RESET':
            return defaults;
    }
});

const useGenerators = () => {
    const [state, dispatch] = useContext(GeneratorContext);
    const { getCurrencyById, decrementCurrency, incrementCurrency } = useCurrency();
    const { getGeneratorMultiplier } = useUpgrades();

    function getIndexById(id) {
        return state.findIndex(obj => obj.id === id);
    }

    function getPurchaseCost(generator) {
        return Math.round(generator.defaultCost * ((generator.amount * generator.amount) * 0.5 + 1));
    }

    function canPurchase(generator) {
        const currency = getCurrencyById(generator.priceUnit);
        return currency.amount >= getPurchaseCost(generator);
    }

    function purchase(generator) {
        if (canPurchase(generator)) {
            decrementCurrency(getCurrencyById(generator.priceUnit), getPurchaseCost(generator));
            dispatch({ type: 'INCREMENT', id: getIndexById(generator.id) });
        }
    }

    function getGenerationPerSecond(generator) {
        let multiplier = getGeneratorMultiplier(generator.id);
        multiplier = multiplier !== 0 ? multiplier : 1;
        return (generator.defaultGeneration * generator.amount) * multiplier;
    }

    function generateCurrency(generator, updateFrequency) {
        incrementCurrency(getCurrencyById(generator.generationUnit), getGenerationPerSecond(generator) / (1000 / updateFrequency));
    }

    function reset() {
        dispatch({ type: 'RESET' });
    }

    return {
        generators: state,
        getGenerationPerSecond,
        getPurchaseCost,
        generateCurrency,
        canPurchase,
        purchase,
        reset
    };
};

export default useGenerators;

export { reducer, defaults };