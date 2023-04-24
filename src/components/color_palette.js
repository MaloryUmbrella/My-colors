import React from 'react';
import DivRows from './atomes/div_rows';
import { addPalette } from './functions/index';

class ColorPalette extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        colors: []
      };
    }
  
    render() {
      return (
        <>
          <div id="main_wrapper">
              <DivRows colors={this.state.colors} event={() => addPalette(this)} state={this}/>
          </div>
        </>
      );
    }
}
  

export default ColorPalette;