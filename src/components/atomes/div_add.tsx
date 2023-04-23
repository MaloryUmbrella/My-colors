import React from 'react';
import { Colors } from '../interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const DivAdd = (colors: Colors) => {
    return (
        <div className="col-md-15 color_wrapper">
            <div className="button color cornered" style={{ backgroundColor: "#404040" }} data-color="#404040" onClick={() => colors.event}>
                <span className="icon">
                    <FontAwesomeIcon icon={faPlus} size="8x"/>
                </span>
                <div className="swipe"> </div>
            </div>
        </div>
    )
}

export default DivAdd;