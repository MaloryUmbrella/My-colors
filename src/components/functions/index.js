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

  hex_color = hex_color.toUpperCase();

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

export function isFirst(i) {
  if (i === 0) {
    return true;
  }
  else {
    return false;
  }
}

export function isMiddle(props, i) {
  if ( (i > 0) && (i < (props.state.colors.length - 1)) && (props.state.colors.length >= 3) ) {
    return true;
  }
  else {
    return false;
  }
}

export function isLast(props, i) {
  if ( (i === props.state.colors.length - 1) && (props.state.colors.length >= 2) ) {
    return true;
  }
  else {
    return false;
  }
}

export function onNextPalette(props, i, ids) {
  let colors = props.state.colors;
  let new_colors = colors[i - 1];
  let old_colors = colors[i];

  colors.splice(i - 1, 1, old_colors);
  colors.splice(i, 1, new_colors);

  let nextDivColor = document.getElementById("div" + (i + 1));
  let nextInputColorDisplay = document.getElementById("input" + (ids + 1));
  let previousDivColor = document.getElementById("div" + i);
  let previousInputColorDisplay = document.getElementById("input" + ids);

  let backgroundColor = previousDivColor.style.backgroundColor;

  nextInputColorDisplay.value = rgbToHex(parseInt(backgroundColor.substring(4,backgroundColor.indexOf(","))), parseInt(backgroundColor.substring(backgroundColor.indexOf(",") + 2, backgroundColor.lastIndexOf(","))), parseInt(backgroundColor.substring(backgroundColor.lastIndexOf(",") + 2, backgroundColor.length - 1)), true);

  backgroundColor = nextDivColor.style.backgroundColor;

  previousInputColorDisplay.value = rgbToHex(parseInt(backgroundColor.substring(4,backgroundColor.indexOf(","))), parseInt(backgroundColor.substring(backgroundColor.indexOf(",") + 2, backgroundColor.lastIndexOf(","))), parseInt(backgroundColor.substring(backgroundColor.lastIndexOf(",") + 2, backgroundColor.length - 1)), true);

  props.setState({colors: colors});
}

export function onPreviousPalette(props, i, ids) {
  let colors = props.state.colors;
  let new_colors = colors[i - 2];
  let old_colors = colors[i - 1];

  colors.splice(i - 2, 1, old_colors);
  colors.splice(i - 1, 1, new_colors);

  let nextDivColor = document.getElementById("div" + (i - 1));
  let nextInputColorDisplay = document.getElementById("input" + (ids - 1));
  let previousDivColor = document.getElementById("div" + i);
  let previousInputColorDisplay = document.getElementById("input" + ids);

  let backgroundColor = previousDivColor.style.backgroundColor;

  nextInputColorDisplay.value = rgbToHex(parseInt(backgroundColor.substring(4,backgroundColor.indexOf(","))), parseInt(backgroundColor.substring(backgroundColor.indexOf(",") + 2, backgroundColor.lastIndexOf(","))), parseInt(backgroundColor.substring(backgroundColor.lastIndexOf(",") + 2, backgroundColor.length - 1)), true);

  backgroundColor = nextDivColor.style.backgroundColor;

  previousInputColorDisplay.value = rgbToHex(parseInt(backgroundColor.substring(4,backgroundColor.indexOf(","))), parseInt(backgroundColor.substring(backgroundColor.indexOf(",") + 2, backgroundColor.lastIndexOf(","))), parseInt(backgroundColor.substring(backgroundColor.lastIndexOf(",") + 2, backgroundColor.length - 1)), true);

  props.setState({colors: colors});
}