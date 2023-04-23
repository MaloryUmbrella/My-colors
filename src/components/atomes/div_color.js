import React from 'react';

const DivColor = ( props ) => {
    let colorWithoutHash = (color) => {
        if (color.includes('#')) {
            let new_color = color.substring(1,color.length);
            return new_color;
        }
        else {
            return color;
        }
    }

    let changeColor = (color, div) => {
        if (color.length < 6) {
            return
        }

        let divColor = document.getElementById(`div${div}`);

        if (color.length === 6) {
            color = "#" + color;
            divColor?.style.setProperty("background-color", color);
        }
        else if (color.startsWith("#") && color.length === 7) {
            divColor?.style.setProperty("background-color", color);
        }
    }

    let key = parseInt(String(props.id));

    return (
        <div className="col-md-15 color_wrapper" key={key}>
			<div className="color" style={{ backgroundColor: props.color }} id={`div${props.id}`} key={key + 1} data-color={props.color}>
                <div className="swipe"> </div>
            </div>
			<div className="color_tools">
				<input className="input" type="text" defaultValue={colorWithoutHash(props.color)} key={key + 2} onChange={(element) => changeColor(element.target.value, props.id)} />
			</div>
		</div>
    )
}

export default DivColor;