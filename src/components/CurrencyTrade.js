import React, { useState } from 'react';

import CurrencyConvertButton from './CurrencyConvertButton';
import CurrencyIcon from './icons/CurrencyIcon';

import useCurrency from "../hooks/useCurrency";
import useReset from '../hooks/useReset';
import { Button } from 'react-bootstrap';
import NotificationDisplay from './NotificationDisplay';

const CurrencyTrade = () => {
    const { reset } = useReset();
    const { currency, getConversionTarget, getCurrencyById, incrementCurrency } = useCurrency();
    const [amount, setAmount] = useState(1);

    const batchSize = isNaN(parseInt(amount)) ? 1 : parseInt(amount);

    return (
        <div className="Container">

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
                    <span className="input-group-text">#</span>
                </div>
            </div>

            {currency.map(c => {
                return (
                    <div key={c.id}>
                        <hr />
                        <CurrencySummaryItem currency={c} />
                        {c.conversionTarget !== null ? <CurrencyConvertButton currency={c} batchSize={batchSize} targetCurrency={getConversionTarget(c)} /> : null}
                    </div>
                );
            })}

            <NotificationDisplay />

            {process.env.REACT_APP_ENV === 'dev' ? (
                <div className="dev-section">
                    <h5>Dev Section</h5>
                    <hr />
                    <div className="buttons">
                        <div className="air">
                            <Button variant="dark" onClick={() => incrementCurrency(getCurrencyById('alchemyOrbs'), 1000)}>
                                Add 1,000 Alchemy
                            </Button>
                        </div>

                        <div className="air">
                            <Button variant="dark" onClick={() => incrementCurrency(getCurrencyById('chaosOrbs'), 100)}>
                                Add 100 Chaos
                            </Button>
                        </div>

                        <div className="air">
                            <Button variant="dark" onClick={() => incrementCurrency(getCurrencyById('exaltedOrbs'), 10)}>
                                Add 10 Exalts
                            </Button>
                        </div>

                        <div className="air">
                            <Button variant="dark" onClick={() => incrementCurrency(getCurrencyById('mirror'), 1)}>
                                Add 1 Mirrors
                            </Button>
                        </div>

                        <div className="air">
                            <Button variant="dark" onClick={() => reset()}>
                                Reset Playthrough
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

const CurrencySummaryItem = ({ currency }) => {
    return (
        <h5 className="CurrencySummaryItem">
            <CurrencyIcon currency={currency} size={50} />
            {currency.namePlural}: {Math.round(currency.amount).toLocaleString('en')}
        </h5>
    );
};

export default CurrencyTrade;