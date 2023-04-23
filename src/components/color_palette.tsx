import React, { useState } from 'react';
import DivRows from './atomes/div_rows'

const ColorPalette = () => {
    const [colors, setColors] = useState(["#339c35"]);

    const handleState = () => {
        let new_color = [];

        for (let color of colors) {
            new_color.push(color);
        }

        new_color.push("#000000");

        setColors(new_color);
    };

    return (
        <>
            <div id="main_wrapper">
                <DivRows colors={colors} />
            </div>
        </>
    );
};

export default ColorPalette;