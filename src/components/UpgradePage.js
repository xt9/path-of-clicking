import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

import CurrencyIcon from './icons/CurrencyIcon';

import useUpgrades from '../hooks/useUpgrades';
import useCurrency from '../hooks/useCurrency';

const UpgradePage = () => {
    const { upgrades } = useUpgrades();
    const availableUpgrades = upgrades.filter((upgrade) => !upgrade.isPurchased);
    const purchasedUpgrades = upgrades.filter((upgrade) => upgrade.isPurchased);

    return (
        <div className="Container">
            <h2>Upgrades</h2>
            <hr />

            {availableUpgrades.map((upgrade) => <Upgrade upgrade={upgrade} key={upgrade.id} />)}

            <div className="UnlockedUpgradesWrapper">
                <h2>Unlocked Upgrades</h2>
                <hr />
                {purchasedUpgrades.map((upgrade) => <Upgrade upgrade={upgrade} key={upgrade.id} />)}
            </div>
        </div>
    );
};

const Upgrade = ({ upgrade }) => {
    const { canPurchase, purchase } = useUpgrades();
    const { getCurrencyById } = useCurrency();

    const costIcon = <CurrencyIcon currency={getCurrencyById(upgrade.purchaseUnit)} size={35} />;

    const purchaseButton = <Button variant="dark" disabled={!canPurchase(upgrade)} onClick={() => purchase(upgrade)}>Buy for {upgrade.purchaseCost}x {costIcon}</Button>;

    return (
        <ListGroup.Item className="Upgrade">
            <h5>{upgrade.name}</h5>
            <p>{upgrade.description}</p>
            {!upgrade.isPurchased ? purchaseButton : null}
        </ListGroup.Item>
    );
};

export default UpgradePage;