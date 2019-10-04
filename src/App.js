import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Tabs, Tab, Container } from 'react-bootstrap';

import TradePage from './components/TradePage';
import UpgradePage from './components/UpgradePage';
import TickRunner from './components/TickRunner';

import { CurrencyProvider } from './components/context/CurrencyContext';
import { GeneratorProvider } from './components/context/GeneratorContext';
import { UpgradeProvider } from './components/context/UpgradeContext';

const App = () => {
    return (
        <Container>
            <CurrencyProvider>
                <GeneratorProvider>
                    <UpgradeProvider>

                        <TickRunner />
                        <ControlledTabs />

                    </UpgradeProvider>
                </GeneratorProvider>
            </CurrencyProvider>

        </Container>
    );
};

const ControlledTabs = () => {
    const [key, setKey] = useState('farm');

    return (
        <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
            <Tab eventKey="farm" title="Store & Trading">
                <TradePage />
            </Tab>
            <Tab eventKey="upgrades" title="Upgrades">
                <UpgradePage />
            </Tab>
            <Tab eventKey="trinkets" title="Trinkets">
                <h2>Trinkets</h2>
            </Tab>
            <Tab eventKey="azurite-mines" title="Azurite Mines" disabled />
        </Tabs>
    );
}

export default App;
