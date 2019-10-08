import React from 'react';

import outpostImage from '../../data/generator-icons/outpost.png';
import shadyImage from '../../data/generator-icons/shady.png';
import mapImage from '../../data/generator-icons/map.png';

const GeneratorIcon = ({ generator, size }) => {
    let image;

    switch (generator.id) {
        case 'outpost': image = outpostImage; break;
        case 'shadyMerchant': image = shadyImage; break;
        case 'mapDevice': image = mapImage; break;
        default: image = outpostImage; break;
    }
    return (
        <div className="GeneratorIcon">
            <img height={size} src={image} alt={generator.name} />
        </div>
    );
};

export default GeneratorIcon;