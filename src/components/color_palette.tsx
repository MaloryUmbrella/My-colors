import React, { useState } from 'react';
import DivRows from './atomes/div_rows';

const ColorPalette = () => {
    let [colors, setColors] = useState<string[]>([]);
    //setColors(["#339c35"]);

    async function addPalette() {
        let new_colors = colors;

        new_colors.push("#000000");

        setColors(new_colors);

        console.log(colors);
    }

    console.log(colors);

    return (
        <>
            <div id="main_wrapper">
                <DivRows colors={colors} event={addPalette}/>
            </div>
        </>
    );
};

export default ColorPalette;