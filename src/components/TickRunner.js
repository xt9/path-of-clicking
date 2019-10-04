import React, { useEffect } from 'react';
import useGenerators from '../hooks/useGenerators';

const TickRunner = () => {
    const { getGenerator } = useGenerators();

    return (
        <div>
            <GeneratorTickRunner generator={getGenerator('outpost')} />
            <GeneratorTickRunner generator={getGenerator('shadyMerchant')} />
        </div>
    );
};

const GeneratorTickRunner = ({ generator }) => {
    const { generateCurrency } = useGenerators();

    /* Generates currency every 50ms */
    useEffect(() => {
        const updateFrequency = 50;
        const interval = setInterval(() => {
            if (generator.amount > 0) {
                generateCurrency(generator, updateFrequency);
            }
        }, updateFrequency);

        return () => clearInterval(interval);
    });
    return null;
};

export default TickRunner;