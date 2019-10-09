import React from 'react';

import useGenerators from '../hooks/useGenerators';
import GeneratorPurchaseItem from './GeneratorPurchaseItem';

const Store = () => {
    const { generators: list } = useGenerators();

    return (
        <div className="Container">
            <h3>Store</h3>
            <hr />

            {list.map((g) => <GeneratorPurchaseItem generator={g} key={g.id} />)}
        </div>
    );
};

export default Store;