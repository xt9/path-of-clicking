import { useEffect } from 'react';
import useGenerators from '../hooks/useGenerators';
import useTrinkets from '../hooks/useTrinkets';
import useInterval from '../hooks/useInterval';

const TickRunner = () => {
    const { generators, generateCurrency } = useGenerators();
    const { updateCooldown } = useTrinkets();

    /* Tickrunner is a high-level component that does not get unmounted, 
        so we update the trinket cooldowns here instead of on the TrinketPage (as it would unmount when switching tab)
    */
    useInterval(() => updateCooldown(), 1000);

    /* Generates currency every 50ms */
    useEffect(() => {
        const updateFrequency = 50;
        const interval = setInterval(() => {
            generators.forEach((generator) => {
                if (generator.amount > 0) {
                    generateCurrency(generator, updateFrequency);
                }
            });
        }, updateFrequency);

        return () => clearInterval(interval);
    });

    return null;
};

export default TickRunner;