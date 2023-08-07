import React from 'react';
import DivRows from './atomes/div_rows';
import FileHandler from './atomes/file_handler';
import { addPalette } from './functions/index';

class ColorPalette extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        colors: [],
        locked: []
      };
    }
  
    render() {
      return (
        <>
          <div className="version-display">
            {
              "My Colors : V1.0.5"
            }
          </div>
          <div className="buttons-import-export">
            <FileHandler colors={this}/>
          </div>
          <div id="main_wrapper">
            <DivRows colors={this.state.colors} event={() => addPalette(this)} state={this}/>
          </div>
        </>
      );
    }
}
  

export default ColorPalette;