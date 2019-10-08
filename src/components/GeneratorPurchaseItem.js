import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

import CurrencyIcon from './icons/CurrencyIcon';
import GeneratorIcon from './icons/GeneratorIcon';

import useGenerators from '../hooks/useGenerators';
import useCurrency from "../hooks/useCurrency";

const GeneratorPurchaseItem = ({ generator }) => {
    const { canPurchase, purchase, getPurchaseCost, getGenerationPerSecond } = useGenerators();
    const { getCurrencyById } = useCurrency();
    const { name, namePlural, amount, priceUnit, generationUnit, lore } = generator;

    const generationCurrency = getCurrencyById(generationUnit);
    const purchaseCurrency = getCurrencyById(priceUnit);

    const cost = getPurchaseCost(generator);
    const currencyPerSecond = getGenerationPerSecond(generator);

    const generationName = currencyPerSecond === 1 ? generationCurrency.name : generationCurrency.namePlural;

    return (
        <ListGroup.Item className="GeneratorPurchaseItem">
            <div className="info">
                <h5>{namePlural} ({amount})</h5>
                <p>{lore}</p>
                <p>Generates {currencyPerSecond.toLocaleString('en')}x <CurrencyIcon currency={generationCurrency} size={28} /> {generationName} per second.</p>
                <Button
                    variant="dark"
                    disabled={!canPurchase(generator)}
                    onClick={() => purchase(generator)}
                >
                    Buy {name} for {cost.toLocaleString('en')}x <CurrencyIcon currency={purchaseCurrency} size={28} />
                </Button>
            </div>
            <GeneratorIcon generator={generator} />
        </ListGroup.Item>
    );
};

export default GeneratorPurchaseItem;