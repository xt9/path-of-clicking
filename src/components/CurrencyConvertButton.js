import React from 'react';
import useCurrency from "../hooks/useCurrency";

import CurrencyIcon from './icons/CurrencyIcon';

import { Button } from 'react-bootstrap';

const CurrencyButton = ({ currency, targetCurrency, batchSize }) => {
    const { convertCurrency, canConvertCurrency } = useCurrency();
    const convertCost = currency.conversionCost * batchSize;

    const fromCurrencyIcon = <CurrencyIcon currency={currency} size={35} />;
    const toCurrencyIcon = <CurrencyIcon currency={targetCurrency} size={35} />;

    return (
        <Button
            variant="dark"
            disabled={!canConvertCurrency(currency, batchSize)}
            onClick={() => convertCurrency(currency, batchSize)}
        >
            Trade {convertCost.toLocaleString('en')}x {fromCurrencyIcon} for {batchSize.toLocaleString('en')}x {toCurrencyIcon}
        </Button>
    );
};

export default CurrencyButton;