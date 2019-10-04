import React from 'react';
import useCurrency from "../hooks/useCurrency";

import { Button } from 'react-bootstrap';

const CurrencyButton = ({ currency, name }) => {
    const { incrementCurrency } = useCurrency();

    return (
        <Button
            variant="dark"
            onClick={() => incrementCurrency(currency, 1)}
        >
            Press me for some {name}!
        </Button>
    );
};

export default CurrencyButton;