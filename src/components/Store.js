import React from 'react';

import useGenerators from '../hooks/useGenerators';
import GeneratorPurchaseItem from './GeneratorPurchaseItem';

const Store = () => {
    const { getGenerator } = useGenerators();
    const outpost = getGenerator('outpost');
    const shadyMerchant = getGenerator('shadyMerchant');

    return (
        <div>
            <h2>Store</h2>
            <hr />

            <GeneratorPurchaseItem
                generator={outpost}
                lore="Outposts will raid nearby areas for currency."
            />

            <GeneratorPurchaseItem
                generator={shadyMerchant}
                lore="Shady Merchants will scam passerbys of their hard-earned currency."
            />
        </div>
    );
};

export default Store;