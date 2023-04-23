import React from 'react';
import DivColor from './div_color';
import DivAdd from './div_add';

const DivRows = (props) => {
    let i = 0;
    let key = -3;

    return (
        <>
            <div className="row colors" id="colors">
                {
		              props.colors.map((color) => {
                    i += 1;
                    key += 3;
                    return <DivColor color={color} id={i} key={key}/>;
                  })
                }
                <DivAdd event={ props.event }/>
		    </div>
        </>
    )
}

export default DivRows;