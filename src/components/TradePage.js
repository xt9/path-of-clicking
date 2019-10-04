import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import CurrencyButton from './CurrencyButton';
import CurrencyConvertButton from './CurrencyConvertButton';
import CurrencyIcon from './CurrencyIcon';
import Store from './Store';

import useCurrency from "../hooks/useCurrency";

const FarmingPage = () => {
    const { getCurrencyByKey, getConversionTarget } = useCurrency();
    const [amount, setAmount] = useState(1);

    const exalts = getCurrencyByKey('exaltedOrbs');
    const chaos = getCurrencyByKey('chaosOrbs');
    const alchs = getCurrencyByKey('alchemyOrbs');

    const batchSize = isNaN(parseInt(amount)) ? 1 : parseInt(amount);

    return (
        <div className="Container">
            <Row>
                <Col sm={6}>
                    <Store />
                </Col>
                <Col sm={6}>
                    <h2>Trading</h2>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Trade Bulk Setting</span>
                        </div>
                        <input
                            className="form-control"
                            type="text"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text"># of items to buy</span>
                        </div>
                    </div>


                    <hr />
                    <CurrencySummary currency={exalts} />
                    <hr />
                    <CurrencySummary currency={chaos} />
                    <CurrencyConvertButton currency={chaos} batchSize={batchSize} targetCurrency={getConversionTarget(chaos)} />
                    <hr />
                    <CurrencySummary currency={alchs} />
                    <CurrencyButton currency={alchs} name="Orbs of Alchemy" />
                    <hr />
                    <CurrencyConvertButton currency={alchs} batchSize={batchSize} targetCurrency={getConversionTarget(alchs)} />
                    <hr />
                </Col>
            </Row>
        </div>
    );
};

const CurrencySummary = ({ currency }) => {
    return (
        <h5 className="CurrencySummary">
            <CurrencyIcon currency={currency} size={50} />
            {currency.name}: {Math.round(currency.amount)}
        </h5>
    );
};

export default FarmingPage;