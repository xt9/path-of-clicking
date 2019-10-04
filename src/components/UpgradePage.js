import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import useUpgrades from '../hooks/useUpgrades';

const Store = () => {
    const { upgrades } = useUpgrades();
    const availableUpgrades = upgrades.filter((upgrade) => !upgrade.purchased);

    return (
        <div className="Container">
            <Row>
                <Col sm={6}>
                    <h2>Upgrades</h2>
                    <hr />

                    {availableUpgrades.map((upgrade) => <Upgrade upgrade={upgrade} key={upgrade.id} />)}
                </Col>
            </Row>
        </div>
    );
};

const Upgrade = ({ upgrade }) => {
    const { canPurchase, purchase } = useUpgrades();

    return (
        <div>
            <p>{upgrade.name}</p>
            <p>{upgrade.description}</p>
            <Button
                disabled={!canPurchase(upgrade)}
                onClick={() => purchase(upgrade)}
            >
                Purchase me
            </Button>
        </div>
    );
};

export default Store;