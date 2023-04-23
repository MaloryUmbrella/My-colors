import React from 'react';
import { Colors } from '../interfaces';
import DivColor from './div_color';
import DivAdd from './div_add';

const DivRows = (colors: Colors) => {
    let i = 0;
    let key = -3;

    return (
        <>
            <div className="row colors" id="colors">
                {
		            colors.colors.map((color) => {
                        i += 1;
                        key += 3;
                        return <DivColor color={color} id={i} key={key}/>;
                    })
                }
                <DivAdd />
		    </div>
        </>
    )
}

export default DivRows;