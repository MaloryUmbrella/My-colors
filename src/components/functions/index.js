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

export function hexToRGB(hex) {
  let lg_hex = hex.length;
  let rgb = "";

  for (let i = 0; i < lg_hex; i ++) {
    if ((i + 1) % 2 === 0) {
      let current_subhex = hex[i]
      let current_subhex_value;

      if (current_subhex === "F") {
        current_subhex_value = 15;
      }
      else if (current_subhex === "E") {
        current_subhex_value = 14;
      }
      else if (current_subhex === "D") {
        current_subhex_value = 13;
      }
      else if (current_subhex === "C") {
        current_subhex_value = 12;
      }
      else if (current_subhex === "B") {
        current_subhex_value = 11;
      }
      else if (current_subhex === "A") {
        current_subhex_value = 10;
      }
      else {
        current_subhex_value = parseInt(current_subhex);
      }

      let previous_subhex = hex[i - 1];
      let previous_subhex_value;

      if (previous_subhex === "F") {
        previous_subhex_value = 15;
      }
      else if (previous_subhex === "E") {
        previous_subhex_value = 14;
      }
      else if (previous_subhex === "D") {
        previous_subhex_value = 13;
      }
      else if (previous_subhex === "C") {
        previous_subhex_value = 12;
      }
      else if (previous_subhex === "B") {
        previous_subhex_value = 11;
      }
      else if (previous_subhex === "A") {
        previous_subhex_value = 10;
      }
      else {
        previous_subhex_value = parseInt(previous_subhex);
      }

      if (i < (lg_hex - 1)) {
        rgb += `${(previous_subhex_value * 16) + current_subhex_value},`;
      }
      else {
        rgb += `${(previous_subhex_value * 16) + current_subhex_value}`;
      }
    }
  }

  return rgb
}

export function max(liste) {
  let max = liste[0];

  for (let i = 0; i < liste.length; i ++) {
    if (max < liste[i]) {
      max = liste[i];
    }
  }

  return max
}

export function min(liste) {
  let min = liste[0];

  for (let i = 0; i < liste.length; i ++) {
    if (liste[i] < min) {
      min = liste[i];
    }
  }

  return min
}

export function absolute(number) {
  return -number
}

export function rgbToHSL(rgb) {
  let R = rgb.substring(0, rgb.indexOf(","));
  let G = rgb.substring(rgb.indexOf(",") + 1, rgb.lastIndexOf(","));
  let B = rgb.substring(rgb.lastIndexOf(",") + 1, rgb.length);
  
  let Rprime = R / 255;
  let Gprime = G / 255;
  let Bprime = B / 255;
  
  let Cmax = max([Rprime,Gprime,Bprime]);
  let Cmin = min([Rprime,Gprime,Bprime]);
  let Delta = Cmax - Cmin;
  let controlKey = "";
  
  let H = 0;
  let S = 0;
  let L = (Cmax + Cmin) / 2;
  
  if (Delta === 0) {
    Delta = 1;
    controlKey = "Active";
  }
  
  if (Cmax === Rprime) {
    H = 60 * (((Gprime - Bprime) / Delta) % 6);
  }
  else if (Cmax === Gprime) {
    H = 60 * (((Bprime - Rprime) / Delta) + 2);
  }
  else if (Cmax === Bprime) {
    H = 60 * (((Rprime - Gprime) / Delta) + 4); 
  }
  
  if (controlKey === "Active") {
    Delta = 0;
  }
  
  if (Delta === 0) {
    S = 0;
  }
  else {
    S = Delta / Cmax;
  }
  
  H = Math.round(H);
  S = Math.round(S * 100);
  L = Math.round(L * 100);
  
  return H + "," + S + "%," + L + "%";
}

export function hslToHEX(color) {
  let h = color.substring(0, color.indexOf(","));
  let s = color.substring(color.indexOf(",") + 1, color.indexOf("%"));
  let l = color.substring(color.lastIndexOf(",") + 1, color.lastIndexOf("%"));

  l /= 100;
  let a = s * Math.min(l, 1 - l) / 100;
  let f = n => {
    let k = (n + h / 30) % 12;
    let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
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

  if (props.state.locked[div - 1]) {
    alert("Pensez à déverouiller votre palette pour pouvoir changer la couleur");

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
  if (colors.state.colors.length === 0) {
    return
  }
  else {
    let paletteList = [];
    let colors2 = colors.state.colors;

    for (let i = 0; i < colors2.length; i ++) {
      let currentDivLock = document.getElementById(`icon${i + 1}`).getAttribute("data-icon");
      let currentLock = false;
      if (currentDivLock === "lock") {
        currentLock = true;
      }
      paletteList.push([colors2[i], currentLock]);
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

    contenu = JSON.stringify(contenu, null, 2);

    FileSaver.saveAs(new File([contenu], "colors.json"));

    return
  }
}

export async function importFile(props) {
  return new Promise(async (resolve, reject) => {
    let file = await selectFile(".json", true);
    const fileReader = new FileReader();
    
    fileReader.addEventListener('load', (event) => {
      try {
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
      }
      catch ( Error ) {
        alert("Il semblerait qu'il y est un problème d'importation. Pensez à indiquer le bon fichier pour importer vos palettes.");
      }
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

export function randomColor(withoutHash) {
  let color = "#";
  let cars = "012356789ABCDEF";

  for (let i = 0; i < 6; i ++) {
    let random = Math.round(Math.random() * (cars.length - 1));

    color += cars[random];
  }

  if (withoutHash) {
    color.substring(1, color.length - 1);
  }

  return color
}

export function generateRandomPalette(target, div, props, input) {
  let new_color = randomColor(false);

  if (props.state.locked[div - 1]) {
    alert("Pensez à déverouiller votre palette pour pouvoir générer une couleur aléatoirement");

    return
  }

  target.classList.add("fa-bounce");
  
  changeColor(new_color, div, props, input);

  setTimeout(function() {
    target.classList.remove("fa-bounce");
  }, 800);
}

export function colorConverter(color, toConvert) {
  let color_converted;

  if (toConvert === "toRGB") {
    color_converted = hexToRGB(color);
  }
  else if (toConvert === "toHSL") {
    color_converted = rgbToHSL(color);
  }
  else if (toConvert === "toHEX") {
    color_converted = hslToHEX(color);
  }

  return color_converted;
}

export function converter(target, input) {
  let target_content = target.textContent;
  let current_input = document.getElementById(`input${input}`);
  let new_color;

  switch (target_content) {
    case "HEX":
      target.innerText = "RGB";
      new_color = colorConverter(current_input.value, "toRGB");
      current_input.value = new_color;
      break;
    case "RGB":
      target.innerText = "HSL";
      new_color = colorConverter(current_input.value, "toHSL");
      current_input.value = new_color;
      break;
    case "HSL":
      target.innerText = "HEX";
      new_color = colorConverter(current_input.value, "toHEX");
      new_color = colorWithoutHash(new_color);
      current_input.value = new_color;
      break;
    default:
      target.innerText = "HEX";
      new_color = colorConverter(current_input.value, "toHEX");
      new_color = colorWithoutHash(new_color);
      current_input.value = new_color;
  }
}