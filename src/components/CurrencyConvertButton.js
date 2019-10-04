import React from 'react';
import useCurrency from "../hooks/useCurrency";

import CurrencyIcon from './CurrencyIcon';

import { Button } from 'react-bootstrap';

const CurrencyButton = ({ currency, targetCurrency, batchSize }) => {
    const { convertCurrency, canConvertCurrency } = useCurrency();
    const convertCost = currency.conversionCost * batchSize;
    const fromName = convertCost === 1 ? currency.name : currency.namePlural;
    const toName = batchSize === 1 ? targetCurrency.name : targetCurrency.namePlural;

    const fromCurrencyIcon = <CurrencyIcon currency={currency} size={35} />;
    const toCurrencyIcon = <CurrencyIcon currency={targetCurrency} size={35} />;

    return (
        <Button
            variant="dark"
            disabled={!canConvertCurrency(currency, batchSize)}
            onClick={() => convertCurrency(currency, batchSize)}
        >
            Trade {convertCost}x {fromName} {fromCurrencyIcon} for {batchSize}x {toName} {toCurrencyIcon}
        </Button>
    );
};

export default CurrencyButton;