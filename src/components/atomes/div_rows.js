import React from 'react';
import DivColor from './div_color';
import DivAdd from './div_add';

let DivRows = (props) => {
    let i = 0;
    let ids = 99;

    return (
        <>
            <div className="row colors" id="colors">
                {
		            props.colors.map((color) => {
                        i += 1;
                        ids += 1;
                        return <DivColor color={color} id={i} ids={ids} state={props.state}/>;
                    })
                }
                <DivAdd event={props.event} />
		    </div>
        </>
    )
}

export default DivRows;