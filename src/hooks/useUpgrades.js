/* eslint-disable default-case */
import { useContext } from 'react';
import produce from "immer";

import { UpgradeContext } from '../components/context/UpgradeContext';
import useCurrency from "../hooks/useCurrency";


const defaults = [
    {
        id: 'biggerOutposts',
        name: 'Bigger Outposts',
        targetGenerator: 'outpost',
        purchaseUnit: 'exaltedOrbs',
        purchaseCost: 15,
        purchased: false,
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
        purchaseCost: 50,
        purchased: false,
        description: 'Shady Merchants generate currency at twice their normal rate.',
        multiplier: {
            amount: 2
        }
    }
];

const reducer = produce((draft, action) => {
    switch (action.type) {
        case 'PURCHASE':
            draft[action.id].purchased = true;
    }
});


const useUpgrades = () => {
    const [upgrades, dispatch] = useContext(UpgradeContext);
    const { getCurrencyByKey, decrementCurrency } = useCurrency();

    function getIndex(upgrade) {
        return upgrades.findIndex(u => u.id === upgrade.id);
    }

    function canPurchase(upgrade) {
        let currency = getCurrencyByKey(upgrade.purchaseUnit);
        return currency.amount >= upgrade.purchaseCost;
    }

    function purchase(upgrade) {
        decrementCurrency(getCurrencyByKey(upgrade.purchaseUnit), upgrade.purchaseCost);
        dispatch({ type: 'PURCHASE', id: getIndex(upgrade) });
    }

    return {
        upgrades,
        canPurchase,
        purchase
    };
};

export default useUpgrades;

export { defaults, reducer };