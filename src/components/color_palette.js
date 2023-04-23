import React from 'react';
import DivRows from './atomes/div_rows';

class ColorPalette extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        colors: ["#339c35"]
      };
    }

    addPalette() {
      let new_colors = this.state.colors;

      new_colors.push("#000000");

      this.setState({colors: new_colors});
    }
  
    render() {
      return (
        <>
          <div id="main_wrapper">
              <DivRows colors={this.state.colors} event={() => this.addPalette()}/>
          </div>
        </>
      );
    }
}
  

export default ColorPalette;