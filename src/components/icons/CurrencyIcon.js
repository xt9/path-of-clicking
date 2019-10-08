import React from 'react';

import chaos from '../../data/currency-icons/chaos.png';
import exalted from '../../data/currency-icons/exalted.png';
import alchemy from '../../data/currency-icons/alchemy.png';
import mirror from '../../data/currency-icons/mirror.png';

const CurrencyIcon = ({ currency, size }) => {
    let image;

    switch (currency.id) {
        case 'chaosOrbs': image = chaos; break;
        case 'alchemyOrbs': image = alchemy; break;
        case 'exaltedOrbs': image = exalted; break;
        case 'mirror': image = mirror; break;
        default: image = chaos; break;
    }
    return (
        <img height={size} src={image} alt={currency.name} className="CurrencyIcon" />
    );
};

export default CurrencyIcon;