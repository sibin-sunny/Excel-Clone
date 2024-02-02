//storage purpose
let collectedSheetDb=[];
let sheetDB = [];

{
  let addSheetBtn = document.querySelector(".sheet-add-icon");
  addSheetBtn.click()
}
// for (let i = 0; i < rows; i++) {
//   let sheetRow = [];
//   for (let j = 0; j < cols; j++) {
//     let cellProp = {
//       bold: false,
//       italic: false,
//       underlined: false,
//       alignment: "left",
//       fontFamily: "monospace",
//       fontSize: "14",
//       fontColor: "#000000",
//       bgColor: "#000000",
//       value:"",
//       formula:"",
//       children:[]
//     };
//     sheetRow.push(cellProp);
//   }
//   sheetDB.push(sheetRow);
// }

//selectors for cell properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underlined = document.querySelector(".underlined");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let fontColor = document.querySelector(".font-color-prop");
let bgColor = document.querySelector(".bgcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColor = "#d1d8e0";
let inactiveColor = "#ecf0f1";

//adding event listeners

bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProps(address);

  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
});

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProps(address);

  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "none";
  italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor;
});

underlined.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProps(address);

  cellProp.underlined = !cellProp.underlined;
  cell.style.textDecoration = cellProp.underlined ? "underline" : "none";
  underlined.style.backgroundColor = cellProp.underlined
    ? activeColor
    : inactiveColor;
});

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProps(address);

  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProps(address);

  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProps(address);

  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

bgColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProps(address);

  cellProp.bgColor = bgColor.value;
  cell.style.backgroundColor = cellProp.bgColor;
  bgColor.value = cellProp.bgColor;
});

alignment.forEach((alignElm) => {
  alignElm.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProps(address);
    let alignValue = e.target.classList[0];

    cellProp.alignment = alignValue;
    cell.style.textAlign = cellProp.alignment;
    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = inactiveColor;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = activeColor;
        rightAlign.style.backgroundColor = inactiveColor;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = activeColor;
        break;
    }
  });
});

let Cells = document.querySelectorAll(".cell");
for (let i = 0;i < Cells.length;i++) {
  attachListenerforCellprops(Cells[i]);
}

function attachListenerforCellprops(cell) {
  cell.addEventListener("click", () => {
    let address = addressBar.value;
    let [rowId, colId] = decodeIdFromAddressbar(address);
    let cellProp = sheetDB[rowId][colId];

    //adding cell properties to selected cell
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "none";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.bgColor==="#000000" ? "transparent":cellProp.bgColor;
    cell.style.textAlign = cellProp.alignment;
    cell.innerText=cellProp.value

    //showing cellprops at properties tab for selected tab
    bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
    italic.style.backgroundColor = cellProp.italic
      ? activeColor
      : inactiveColor;
    underlined.style.backgroundColor = cellProp.underlined
      ? activeColor
      : inactiveColor;
    fontFamily.value = cellProp.fontFamily;
    fontSize.value = cellProp.fontSize;
    fontColor.value = cellProp.fontColor;
    bgColor.value = cellProp.bgColor;
    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = inactiveColor;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = activeColor;
        rightAlign.style.backgroundColor = inactiveColor;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColor;
        centerAlign.style.backgroundColor = inactiveColor;
        rightAlign.style.backgroundColor = activeColor;
        break;
    }
    formulaBar.value=cellProp.formula
  });
}

function getCellAndCellProps(address) {
  let [rowId, colId] = decodeIdFromAddressbar(address);
  let cell = document.querySelector(
    `.cell[rowId="${rowId}"][colId="${colId}"]`
  );
  let cellProp = sheetDB[rowId][colId];
  return [cell, cellProp];
}

function decodeIdFromAddressbar(address) {
  let rowId = Number(address.slice(1) - 1);
  let colId = Number(address.charCodeAt(0)) - 65;
  return [rowId, colId];
}
