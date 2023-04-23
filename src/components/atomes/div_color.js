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

    let rgbToHex = (r, g, b, withoutHash) => {
        let hex_color;

        if (withoutHash) {
            hex_color = "" + r.toString(16) + g.toString(16) + b.toString(16);
        }
        else {
            hex_color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
        }

        return hex_color;
    }

    let copyColor = (div) => {
        let divColor = document.getElementById(`div${div}`);

        let color = divColor.style.getPropertyValue("background-color");

        let color_to_hex = rgbToHex(parseInt(color.substring(4,color.indexOf(","))), parseInt(color.substring(color.indexOf(",") + 2, color.lastIndexOf(","))), parseInt(color.substring(color.lastIndexOf(",") + 2, color.length - 1)), true);

        navigator.clipboard.writeText(color_to_hex).then(function() {
                alert("La couleur a bien été copiée dans le presse papier");
            }, function() {
                alert("La couleur n'a pas pu être copiée dans le presse papier");
        });
    }

    let key = parseInt(String(props.id));

    return (
        <div className="col-md-15 color_wrapper" key={key}>
			<div className="color" style={{ backgroundColor: props.color }} id={`div${props.id}`} key={key + 1} data-color={props.color} onClick={() => copyColor(props.id)}>
                <div className="swipe"> </div>
            </div>
			<div className="color_tools">
				<input className="input" type="text" defaultValue={colorWithoutHash(props.color)} key={key + 2} onChange={(element) => changeColor(element.target.value, props.id)} />
			</div>
		</div>
    )
}

export default DivColor;