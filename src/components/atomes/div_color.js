import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLockOpen, faLock, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { deletePalette, lockPalette, unlockPalette, rgbToHex, isFirst, isMiddle, isLast, onNextPalette, onPreviousPalette } from '../functions';

class DivColor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locked: false
        }
    }

    colorWithoutHash = (color) => {
        if (color.includes('#')) {
            let new_color = color.substring(1,color.length);
            return new_color;
        }
        else {
            return color;
        }
    }

    changeColor = (color, div, props) => {
        if (color.length < 6) {
            return
        }

        let divColor = document.getElementById(`div${div}`);

        if (color.length === 6) {
            color = "#" + color;
            divColor?.style.setProperty("background-color", color);

            let colors = props.state.colors;

            colors.splice(div-1, 1, color);

            props.setState({colors: colors});
        }
        else if (color.startsWith("#") && color.length === 7) {
            divColor?.style.setProperty("background-color", color);

            let colors = props.state.colors;

            colors.splice(div-1, 1, color);

            props.setState({colors: colors});
        }
    }

    copyColor = (div) => {
        let divColor = document.getElementById(`div${div}`);

        let color = divColor.style.getPropertyValue("background-color");

        let color_to_hex = rgbToHex(parseInt(color.substring(4,color.indexOf(","))), parseInt(color.substring(color.indexOf(",") + 2, color.lastIndexOf(","))), parseInt(color.substring(color.lastIndexOf(",") + 2, color.length - 1)), true);

        if (color_to_hex === "000") {
            color_to_hex = "000000";
        }

        color_to_hex = color_to_hex.toUpperCase();

        navigator.clipboard.writeText(color_to_hex).then(function() {
                alert("La couleur a bien été copiée dans le presse papier");
            }, function() {
                alert("La couleur n'a pas pu être copiée dans le presse papier");
            }
        );
    }

    render() {
        return (
            <div className="col-md-15 color_wrapper">
	    		<div>
                    <div className="color" style={{ backgroundColor: this.props.color }} id={`div${this.props.id}`} data-color={this.props.color} onClick={() => this.copyColor(this.props.id)}>
                        <div className="swipe"> </div>
                    </div>
	    		    <div className="color_tools">
	    		    	<input className="input" type="text" id={`input${this.props.ids}`} defaultValue={this.colorWithoutHash(this.props.color)} onChange={(element) => this.changeColor(element.target.value, this.props.id, this.props.state)} />
	    		    </div>
                </div>
                <div className="icons">
                    {
                        [
                            isFirst(this.props.id - 1) === true ? (
                                <div className="btn btn-circle">
                                    <FontAwesomeIcon icon={faChevronRight} size="lg" onClick={() => onNextPalette(this.props.state, this.props.id, this.props.ids)}/>
                                </div>
                            ): null,
                            isMiddle(this.props.state, this.props.id - 1) === true ? (
                                <>
                                    <div className="btn btn-circle">
                                        <FontAwesomeIcon icon={faChevronRight} size="lg" onClick={() => onNextPalette(this.props.state, this.props.id, this.props.ids)}/>
                                    </div>
                                    <div className="btn btn-circle">
                                        <FontAwesomeIcon icon={faChevronLeft} size="lg" onClick={() => onPreviousPalette(this.props.state, this.props.id, this.props.ids)}/>
                                    </div>
                                </>
                            ): null,
                            isLast(this.props.state, this.props.id -1) === true ? (
                                <div className="btn btn-circle">
                                    <FontAwesomeIcon icon={faChevronLeft} size="lg" onClick={() => onPreviousPalette(this.props.state, this.props.id, this.props.ids)}/>
                                </div>
                            ): null
                        ]
                    }
                    <div className="btn btn-circle">
                        {
                            [
                                this.state.locked === true ? (
                                    <FontAwesomeIcon icon={faLock} color="#B9B9B9" size="lg" onClick={() => unlockPalette(this)}/>
                                ): null,
                                this.state.locked === false ? (
                                    <FontAwesomeIcon icon={faLockOpen} color="#B9B9B9" size="lg" onClick={() => lockPalette(this)}/>
                                ): null
                            ]
                        }
                    </div>
                    <div className="btn btn-circle trashcan">
                        <FontAwesomeIcon icon={faTrash} color="#DE2121" size="lg" onClick={() => deletePalette(this.props.state, this, this.props.id, this.props.ids)}/>
                    </div>
                </div>
	    	</div>
        )
    }
}

export default DivColor;