import React from 'react';

import ventorImage from '../../data/trinket-icons/ventor.png';
import precursorImage from '../../data/trinket-icons/precursor.png';
import choirImage from '../../data/trinket-icons/choir.png';
import scarabImage from '../../data/trinket-icons/scarab.png';


const TrinketIcon = ({ trinket, size }) => {
    let image;

    switch (trinket.id) {
        case 'ventor': image = ventorImage; break;
        case 'precursor': image = precursorImage; break;
        case 'choir': image = choirImage; break;
        case 'scarab': image = scarabImage; break;
        default: image = ventorImage; break;
    }
    return (
        <div className="TrinketIcon">
            <img height={size} src={image} alt={trinket.name} />
        </div>
    );
};

export default TrinketIcon;