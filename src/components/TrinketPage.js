import React from 'react';
import { Button } from 'react-bootstrap';

import CurrencyIcon from './icons/CurrencyIcon';

import useCurrency from '../hooks/useCurrency';
import useTrinkets from '../hooks/useTrinkets';
import TrinketIcon from './icons/TrinketIcon';

const TrinketPage = () => {
    const { trinkets } = useTrinkets();
    const available = trinkets.filter((t) => !t.isPurchased);
    const purchased = trinkets.filter((t) => t.isPurchased);

    return (
        <div className="Container">
            <div className="UnlockedTrinketsWrapper">
                <h2>Unlocked Trinkets</h2>
                <hr />
                {purchased.map((trinket) => <Trinket trinket={trinket} key={trinket.id} />)}
            </div>
            <hr />

            <h2>Available Trinkets</h2>
            {available.map((trinket) => <Trinket trinket={trinket} key={trinket.id} />)}
        </div>
    );
};

const Trinket = ({ trinket }) => {
    const { canPurchase, purchase, canActivate, activate } = useTrinkets();
    const { getCurrencyById } = useCurrency();

    const costIcon = <CurrencyIcon currency={getCurrencyById(trinket.purchaseUnit)} size={35} />;

    const purchaseButton = (
        <Button variant="dark" disabled={!canPurchase(trinket)} onClick={() => purchase(trinket)}>
            Buy for {trinket.purchaseCost}x {costIcon}
        </Button>
    );

    const activateButton = (
        <Button variant="dark" disabled={!canActivate(trinket)} onClick={() => activate(trinket)}>
            {trinket.currentCooldown === 0 ? trinket.actionName : 'Available in ' + trinket.currentCooldown + ' seconds'}
        </Button>
    );

    return (
        <div className="Trinket">
            <div className="info">
                <h5>{trinket.name}</h5>
                <blockquote>
                    <i>"{trinket.lore}"</i>
                </blockquote>
                {!trinket.isPurchased ? purchaseButton : null}
                {trinket.isPurchased ? activateButton : null}
            </div>
            <TrinketIcon trinket={trinket} />
        </div>
    );
};

export default TrinketPage;