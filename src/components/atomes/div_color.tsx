import React from 'react';

interface Props {
    color: string;
}

const DivColor = ( props: Props ) => {
    let colorWithoutHash = (color: string): string => {
        if (color.includes('#')) {
            let new_color = color.substring(1,color.length);
            return new_color;
        }
        else {
            return color;
        }
    }

    return (
        <div className="col-md-15 color_wrapper">
			<div className="color" style={{ backgroundColor: props.color }} data-id="0" data-color={props.color}>
                <div className="swipe"> </div>
            </div>
			<div className="color_tools">
				<input className="input" type="text" defaultValue={colorWithoutHash(props.color)} />
			</div>
		</div>
    )
}

export default DivColor;