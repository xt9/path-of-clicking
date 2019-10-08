/* eslint-disable default-case */
import { useContext } from 'react';
import produce from "immer";

import { UpgradeContext } from '../components/context/UpgradeContext';
import useCurrency from "./useCurrency";


const defaults = [
    {
        id: 'biggerOutposts',
        name: 'Bigger Outposts',
        targetGenerator: 'outpost',
        purchaseUnit: 'exaltedOrbs',
        purchaseCost: 15,
        isPurchased: false,
        description: 'Outposts generate currency at twice their normal rate.',
        multiplier: {
            amount: 2
        }
    },
    {
        id: 'fasterMerchants',
        name: 'Faster Merchants',
        targetGenerator: 'shadyMerchant',
        purchaseUnit: 'exaltedOrbs',
        purchaseCost: 150,
        isPurchased: false,
        description: 'Shady Merchants generate currency at twice their normal rate.',
        multiplier: {
            amount: 2
        }
    }
];

const reducer = produce((draft, action) => {
    switch (action.type) {
        case 'PURCHASE':
            draft[action.index].isPurchased = true;
            return;
        case 'RESET':
            return defaults;
    }
});


const useUpgrades = () => {
    const [state, dispatch] = useContext(UpgradeContext);
    const { getCurrencyById, decrementCurrency } = useCurrency();

    function getIndexById(id) {
        return state.findIndex(obj => obj.id === id);
    }

    function canPurchase(upgrade) {
        const currency = getCurrencyById(upgrade.purchaseUnit);
        return currency.amount >= upgrade.purchaseCost;
    }

    function getGeneratorMultiplier(generatorId) {
        let upgrades = state.filter(u => {
            return u.targetGenerator === generatorId && u.isPurchased && 'multiplier' in u;
        });
        let multiplier = 0;
        upgrades.forEach(upgrade => {
            multiplier += upgrade.multiplier.amount;
        });
        return multiplier;
    }

    function purchase(upgrade) {
        decrementCurrency(getCurrencyById(upgrade.purchaseUnit), upgrade.purchaseCost);
        dispatch({ type: 'PURCHASE', index: getIndexById(upgrade.id) });
    }

    function reset() {
        dispatch({ type: 'RESET' });
    }

    return {
        upgrades: state,
        canPurchase,
        getGeneratorMultiplier,
        purchase,
        reset
    };
};

export default useUpgrades;

export { defaults, reducer };