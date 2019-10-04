import { useContext } from 'react';
import { GeneratorContext } from '../components/context/GeneratorContext';

import useCurrency from "../hooks/useCurrency";

const defaults = {
    outpost: {
        id: 'outpost',
        amount: 0,
        defaultCost: 4,
        defaultGeneration: 1.5,
        priceUnit: 'chaosOrbs',
        generationUnit: 'alchemyOrbs',
        name: 'Outpost',
        namePlural: 'Outposts'
    },
    shadyMerchant: {
        id: 'shadyMerchant',
        amount: 0,
        defaultCost: 8,
        defaultGeneration: 1,
        priceUnit: 'chaosOrbs',
        generationUnit: 'chaosOrbs',
        name: 'Shady Merchant',
        namePlural: 'Shady Merchants'
    }
};

const useGenerators = () => {
    const [state, setState] = useContext(GeneratorContext);
    const { getCurrencyByKey, decrementCurrency, incrementCurrency } = useCurrency();

    function getPurchaseCost(generator) {
        return Math.round(generator.defaultCost * ((generator.amount * generator.amount) * 0.5 + 1));
    }

    function canPurchase(generator) {
        const currency = getCurrencyByKey(generator.priceUnit);
        return currency.amount >= getPurchaseCost(generator);
    }

    function purchase(generator) {
        if (canPurchase(generator)) {
            const currency = getCurrencyByKey(generator.priceUnit);
            decrementCurrency(currency, getPurchaseCost(generator));

            buildGenerator(generator);
        }
    }

    function buildGenerator(generator) {
        generator.amount++;
        const key = generator.id;

        setState(state => {
            return {
                ...state,
                [key]: generator
            };
        });
    }

    function getGenerationPerSecond(generator) {
        /* Hook into with upgrade values here */
        return generator.defaultGeneration * generator.amount;
    }

    function generateCurrency(generator, updateFrequency) {
        incrementCurrency(getCurrencyByKey(generator.generationUnit), getGenerationPerSecond(generator) / (1000 / updateFrequency));
    }

    function getGenerator(generator) {
        return state[generator];
    }

    return {
        generators: state,
        getGenerationPerSecond,
        getPurchaseCost,
        getGenerator,
        generateCurrency,
        canPurchase,
        purchase
    };
};

export default useGenerators;

export { defaults };