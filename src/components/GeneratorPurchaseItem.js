import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

import CurrencyIcon from './CurrencyIcon';
import useGenerators from '../hooks/useGenerators';
import useCurrency from "../hooks/useCurrency";

const GeneratorPurchaseItem = ({ generator, lore }) => {
    const { canPurchase, purchase, getPurchaseCost, getGenerationPerSecond } = useGenerators();
    const { getCurrencyByKey } = useCurrency();
    const { name, namePlural, amount, priceUnit, generationUnit } = generator;

    const generationCurrency = getCurrencyByKey(generationUnit);
    const purchaseCurrency = getCurrencyByKey(priceUnit);

    const cost = getPurchaseCost(generator);
    const currencyPerSecond = getGenerationPerSecond(generator);

    const generationName = currencyPerSecond === 1 ? generationCurrency.name : generationCurrency.namePlural;
    const purchaseName = cost === 1 ? purchaseCurrency.name : purchaseCurrency.namePlural;

    return (
        <ListGroup.Item className="GeneratorPurchaseItem">
            <h3>{namePlural} x{amount}</h3>
            <p>{lore}</p>
            <p>Generates {currencyPerSecond} <CurrencyIcon currency={generationCurrency} size={30} /> {generationName} per second.</p>
            <p>Next {name} costs: {cost} {purchaseName} <CurrencyIcon currency={purchaseCurrency} size={30} /></p>
            <Button
                variant="dark"
                disabled={!canPurchase(generator)}
                onClick={() => purchase(generator)}
            >
                Buy {name}
            </Button>
        </ListGroup.Item>
    );
};

export default GeneratorPurchaseItem;