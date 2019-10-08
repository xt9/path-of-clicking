/* eslint-disable default-case */
import React, { useContext } from 'react';
import produce from "immer";

import { TrinketContext } from '../components/context/TrinketContext';
import useCurrency from "./useCurrency";
import useNotification from './useNotifications';

const defaults = [
    {
        id: 'ventor',
        name: 'Ventor\'s Gamble',
        lore: 'In a blaze of glory, An anomaly defying all odds The "unkillable" beast met the divine and Ventor met his latest trophy.',
        cooldown: 0,
        currentCooldown: 0,
        actionName: 'Shake the dice vigorously',
        purchaseUnit: 'alchemyOrbs',
        purchaseCost: 0,
        isPurchased: true
    },
    {
        id: 'precursor',
        name: 'Precursor\'s Emblem',
        lore: 'History teaches humility.',
        cooldown: 20,
        currentCooldown: 0,
        actionName: 'Try it on',
        purchaseUnit: 'exaltedOrbs',
        purchaseCost: 25,
        isPurchased: false

    },
    {
        id: 'choir',
        name: 'Choir of the Storm',
        lore: 'But the fool did not bow. The fool stood and questioned. And the fool was unwritten.',
        cooldown: 60,
        currentCooldown: 0,
        actionName: 'Caress the skull',
        purchaseUnit: 'mirror',
        purchaseCost: 1,
        isPurchased: false
    },
    {
        id: 'scarab',
        name: 'Polished Sulphite Scarab',
        lore: 'For harnessing and controlling the power of lightning, you, Raethan, are now charged with researching this new energy.',
        cooldown: 0,
        currentCooldown: 0,
        actionName: 'Shatter the Scarab',
        purchaseUnit: 'mirror',
        purchaseCost: 3,
        isPurchased: false
    }
];

const reducer = produce((draft, action) => {
    switch (action.type) {
        case 'PURCHASE':
            draft[action.index].isPurchased = true;
            return;
        case 'COOLDOWN_START':
            draft[action.index].currentCooldown = action.cooldown;
            return;
        case 'COOLDOWN_DECREMENT':
            draft[action.index].currentCooldown -= 1;
            return;
        case 'REMOVE':
            draft.splice(action.index, 1);
            return;
        case 'RESET':
            return defaults;
    }
});


const useTrinkets = () => {
    const [state, dispatch] = useContext(TrinketContext);
    const { addNotification } = useNotification();

    const { getCurrencyById, decrementCurrency, incrementCurrency } = useCurrency();

    function updateCooldown() {
        const needsUpdating = state.filter((trinket) => trinket.currentCooldown !== 0);
        needsUpdating.forEach(trinket => {
            dispatch({ type: 'COOLDOWN_DECREMENT', index: getIndexById(trinket.id) });
        });
    }

    function getIndexById(id) {
        return state.findIndex(obj => obj.id === id);
    }

    function canPurchase(trinket) {
        const currency = getCurrencyById(trinket.purchaseUnit);
        return currency.amount >= trinket.purchaseCost;
    }


    function canActivate(trinket) {
        return trinket.currentCooldown === 0;
    }

    function activate(trinket) {
        switch (trinket.id) {
            case 'ventor':
                /* No cooldown ability, gives the player 2x Orb of Alchemy */
                incrementCurrency(getCurrencyById('alchemyOrbs'), 2);
                break;
            case 'precursor':
                let precursorAmount = 1500;
                incrementCurrency(getCurrencyById('chaosOrbs'), precursorAmount);
                addNotification('Precursors Bargain', <span>You gained <b>{precursorAmount}</b> Chaos Orbs</span>);
                break;
            case 'choir':
                let choirAmount = 300;
                incrementCurrency(getCurrencyById('exaltedOrbs'), choirAmount);
                addNotification('Dance of the Skeletons', <span>You gained <b>{choirAmount}</b> Exalted Orbs</span>);
                break;
            case 'scarab':
                JSON.stringify(window.localStorage.setItem('isPrestigeUnlocked', true));
                addNotification('A Brave New world', <span>You unlocked access to the <b>Azurite Mines</b>. The scarab was destroyed in the process.</span>);
                /* Removing the scarab will trigger the useEffect in the tab controller that will read the updated localStorage value */
                remove(trinket);
                break;
            default:
                break;
        }

        if (trinket.cooldown > 0) {
            startCooldown(trinket);
        }
    }

    function startCooldown(trinket) {
        dispatch({ type: 'COOLDOWN_START', index: getIndexById(trinket.id), cooldown: trinket.cooldown });
    }

    function purchase(trinket) {
        decrementCurrency(getCurrencyById(trinket.purchaseUnit), trinket.purchaseCost);
        dispatch({ type: 'PURCHASE', index: getIndexById(trinket.id) });
    }

    /* For consumable trinkets that are used once */
    function remove(trinket) {
        dispatch({ type: 'REMOVE', index: getIndexById(trinket.id) });
    }

    function reset() {
        dispatch({ type: 'RESET' });
    }

    return {
        trinkets: state,
        canPurchase,
        canActivate,
        updateCooldown,
        activate,
        purchase,
        reset
    };
};

export default useTrinkets;

export { defaults, reducer };