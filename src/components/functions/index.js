const FileSaver = require('file-saver');

export function addPalette(props) {
  let new_colors = props.state.colors;
  let new_locks = props.state.locked;

  new_colors.push("#000000");
  new_locks.push(false);

  props.setState({colors: new_colors});
  props.setState({locked: new_locks});
}

export function colorWithoutHash(color) {
  if (color.includes('#')) {
      let new_color = color.substring(1,color.length);
      return new_color;
  }
  else {
      return color;
  }
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

export function deletePalette(props, i, ids) {
  if (props.state.locked[i - 1]) {
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

export function lockPalette(props, id) {
  let new_locks = props.state.state.locked;
  new_locks[id - 1] = true;
  props.state.setState({locked: new_locks});
}

export function unlockPalette(props, id) {
  let new_locks = props.state.state.locked;
  new_locks[id - 1] = false;
  props.state.setState({locked: new_locks});
}

export function isFirst(props, i) {
  if ((i === 0) && (props.state.colors.length > 1)) {
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

export function onNextPalette(props, props2, i, ids) {
  if (props.state.locked[i - 1]) {
    alert("Pensez à déverouiller votre palette pour pouvoir la déplacer");
  }
  else {
    let statePreviousLock = document.getElementById(`icon${props2.props.iconId + 1}`);
    
    if (statePreviousLock.getAttribute("data-icon") === "lock") {
      alert("Pensez à déverouiller la palette de droite pour pouvoir déplacer la palette actuelle");
    }
    else {
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
  }
}

export function onPreviousPalette(props, props2, i, ids) {
  if (props.state.locked[i - 1]) {
    alert("Pensez à déverouiller votre palette pour pouvoir la déplacer");
  }
  else {
    let statePreviousLock = document.getElementById(`icon${props2.props.iconId - 1}`);
    
    if (statePreviousLock.getAttribute("data-icon") === "lock") {
      alert("Pensez à déverouiller la palette de gauche pour pouvoir déplacer la palette actuelle");
    }
    else {
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
  }
}

export function changeColor(color, div, props, input) {
  if (color.length < 6) {
    return
  }

  let divColor = document.getElementById(`div${div}`);
  let inputColor = document.getElementById(`input${input}`);

  if (color.length === 6) {
      color = "#" + color;
      divColor?.style.setProperty("background-color", color);
      inputColor.value = colorWithoutHash(color).toUpperCase();

      let colors = props.state.colors;

      colors.splice(div-1, 1, color);

      props.setState({colors: colors});
  }
  else if (color.startsWith("#") && color.length === 7) {
      divColor?.style.setProperty("background-color", color);
      inputColor.value = colorWithoutHash(color).toUpperCase();

      let colors = props.state.colors;

      colors.splice(div-1, 1, color);

      props.setState({colors: colors});
  }
}

export function exportFile(colors) {
  if (colors.length === 0) {
    return
  }
  else {
    let paletteList = [];

    for (let i = 0; i < colors.length; i ++) {
      let currentDivLock = document.getElementById(`icon${i + 1}`).getAttribute("data-icon");
      let currentLock = false;
      if (currentDivLock === "lock") {
        currentLock = true;
      }
      paletteList.push([colors[i], currentLock]);
    }

    class Colors {
      colors = [];
    }

    class color {
      constructor(color, locked) {
        this.color = color;
        this.locked = locked;
      }
    }

    let contenu = new Colors();

    for (let b = 0; b < paletteList.length; b ++) {
      let currentPalette = paletteList[b];
      let colore = new color(currentPalette[0], currentPalette[1]);
      contenu.colors.push(colore);
    }

    contenu = JSON.stringify(contenu, null, 2)

    FileSaver.saveAs(new File([contenu], "colors.json"));

    return
  }
}

export async function importFile(props) {
  return new Promise(async (resolve, reject) => {
    let file = await selectFile(".json", true);
    const fileReader = new FileReader();
  
    fileReader.addEventListener('load', (event) => {
      let result = event.target.result;
  
      let content = JSON.parse(result);
      
      let new_colors = [];
      let new_locks = [];
  
      for (let i = 0; i < content.colors.length; i ++) {
        let current_palette = content.colors[i];
        new_colors.push(current_palette['color']);
        new_locks.push(current_palette['locked']);
      }
  
      props.setState({colors: new_colors});
      props.setState({locked: new_locks});

      resolve(new_locks);
    });
  
    fileReader.readAsText(file[0]);
  });
}

function selectFile (contentType, multiple){
  return new Promise(resolve => {
      let input = document.createElement('input');
      input.type = 'file';
      input.multiple = multiple;
      input.accept = contentType;

      input.onchange = _ => {
          let files = Array.from(input.files);
          if (multiple)
            resolve(files);
          else
            resolve(files[0]);
      };

      input.click();
  });
}