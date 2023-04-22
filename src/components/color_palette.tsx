import React from 'react';
import DivColor from './atomes/div_color';

const ColorPalette = () => {
    return (
        <>
            <div id="main_wrapper">
                <div className="row colors" id="colors">
			        <DivColor color={"#339c35"} />

			        <DivColor color={"#c2cd52"} />
			        
					<DivColor color={"#ecc39c"} />
			        
					<DivColor color={"#cc7833"} />
			        
					<DivColor color={"#880b0a"} />
		        </div>
            </div>
        </>
  );
};

export default ColorPalette;