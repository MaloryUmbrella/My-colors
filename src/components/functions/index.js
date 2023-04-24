export function addPalette(props) {
  let new_colors = props.state.colors;

  new_colors.push("#000000");

  props.setState({colors: new_colors});
}

export function rgbToHex(r, g, b, withoutHash) {
  let hex_color;

  if (withoutHash) {
    hex_color = "" + r.toString(16) + g.toString(16) + b.toString(16);
  }
  else {
    hex_color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  }

  if (hex_color === "#000") {
    hex_color = "#000000";
  }
  else if (hex_color === "000") {
    hex_color = "000000";
  }

  return hex_color;
}

export function deletePalette(props, props2, i, ids) {
  if (props2.state.locked) {
    alert("Pensez à déverouiller votre palette pour pouvoir la supprimer");
  }
  else {
    let inputColorDisplay = document.getElementById("input" + ids);
    let nextDivColor = document.getElementById("div" + (i + 1));
    if (nextDivColor == null) {
      let new_colors = props.state.colors;
      i -= 1;

      new_colors.splice(i, 1);

      props.setState({colors: new_colors});
    }
    else {
      let backgroundColor = nextDivColor.style.backgroundColor;

      inputColorDisplay.value = rgbToHex(parseInt(backgroundColor.substring(4,backgroundColor.indexOf(","))), parseInt(backgroundColor.substring(backgroundColor.indexOf(",") + 2, backgroundColor.lastIndexOf(","))), parseInt(backgroundColor.substring(backgroundColor.lastIndexOf(",") + 2, backgroundColor.length - 1)), true);

      let new_colors = props.state.colors;
      i -= 1;

      new_colors.splice(i, 1);

      props.setState({colors: new_colors});
    }
  }
}

export function lockPalette(props) {
  props.setState({locked: true});
}

export function unlockPalette(props) {
  props.setState({locked: false});
}