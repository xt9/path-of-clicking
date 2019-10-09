import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import './css/animate.min.css';

import { Container, Button } from 'react-bootstrap';

import Store from './components/Store';
import UpgradePage from './components/UpgradePage';
import TrinketPage from './components/TrinketPage';
import CurrencyTrade from './components/CurrencyTrade';

import TickRunner from './components/TickRunner';
import useTrinkets from './hooks/useTrinkets';

import { CurrencyProvider } from './components/context/CurrencyContext';
import { GeneratorProvider } from './components/context/GeneratorContext';
import { UpgradeProvider } from './components/context/UpgradeContext';
import { TrinketProvider } from './components/context/TrinketContext';
import { NotificationProvider } from './components/context/NotificationContext';

const App = () => {
    useEffect(() => {
        document.title = "Path of Clicking";
    }, []);

    return (
        <Container>
            <CurrencyProvider>
                <GeneratorProvider>
                    <UpgradeProvider>
                        <TrinketProvider>
                            <NotificationProvider>

                                <TickRunner />

                                <div className="wrapper">
                                    <div className="left">
                                        <ControlledTabs />
                                    </div>
                                    <div className="right">
                                        <CurrencyTrade />
                                    </div>
                                </div>

                            </NotificationProvider>
                        </TrinketProvider>
                    </UpgradeProvider>
                </GeneratorProvider>
            </CurrencyProvider>

        </Container>
    );
};

const ControlledTabs = () => {
    const { trinkets } = useTrinkets();
    const [key, setKey] = useState('store');
    const [isPrestigeUnlocked, setPrestigeUnlocked] = useState(JSON.parse(window.localStorage.getItem('isPrestigeUnlocked')));

    useEffect(() => {
        /* Update local scope isPrestigeUnlocked if trinket state changes */
        setPrestigeUnlocked(JSON.parse(window.localStorage.getItem('isPrestigeUnlocked')));
    }, [trinkets]);

    const tabs = [
        { title: 'Store', key: 'store', pageElement: <Store />, enabled: true },
        { title: 'Trinkets', key: 'trinkets', pageElement: <TrinketPage />, enabled: true },
        { title: 'Upgrades', key: 'upgrades', pageElement: <UpgradePage />, enabled: true },
        { title: 'Azurite mine', key: 'azurite', pageElement: <div></div>, enabled: isPrestigeUnlocked }
    ];
    const currentTab = tabs.findIndex(obj => obj.key === key);

    return (
        <div>
            <nav id="navigation">
                <ul>
                    {tabs.map((tab) => {
                        return (
                            <li key={tab.key}>
                                <Button variant="dark" onClick={(k) => setKey(tab.key)} disabled={!tab.enabled}>
                                    {tab.title}
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {tabs[currentTab].pageElement}
        </div>
    );
};

export default App;