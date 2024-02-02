let ctrlKey;

document.addEventListener("keydown", (e) => {
  ctrlKey = e.ctrlKey;
});
document.addEventListener("keyup", (e) => {
  ctrlKey = e.ctrlKey;
});

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
    handleCellSelection(cell);
  }
}

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");

let rangeStorage = [];

function handleCellSelection(cell) {
  cell.addEventListener("click", (e) => {
    if (!ctrlKey) return;
    if (rangeStorage.length >= 2) {
      defaultSelectedCellUI();
      rangeStorage = [];
    }
    //UI Change  
    cell.style.border = "3px solid #218c74";

    let rid = cell.getAttribute("rowId");
    let cid = cell.getAttribute("colId");
    rangeStorage.push([rid, cid]);
    console.log(rangeStorage);
  });
}

function defaultSelectedCellUI() {
  for (let i = 0; i < rangeStorage.length; i++) {
    let cell = document.querySelector(
      `.cell[rowId="${rangeStorage[i][0]}"][colId="${rangeStorage[i][1]}"]`
    );
    cell.style.border = "1px solid #c4c7c5";
  }
}

let copyData = [];
copyBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;
  copyData = [];

  let startRow = rangeStorage[0][0];
  let startCol = rangeStorage[0][1];
  let endRow = rangeStorage[1][0];
  let endCol = rangeStorage[1][1];

  for (let i = startRow; i <= endRow; i++) {
    let copyRow = [];
    for (let j = startCol; j <= endCol; j++) {
      let cellProp = sheetDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }
  defaultSelectedCellUI();
});

cutBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;

  let startRow = rangeStorage[0][0];
  let startCol = rangeStorage[0][1];
  let endRow = rangeStorage[1][0];
  let endCol = rangeStorage[1][1];

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);

      let cellProp = sheetDB[i][j];
      cellProp.value = "";
      cellProp.bold = false;
      cellProp.italic = false;
      cellProp.underlined = false;
      cellProp.fontSize = 14;
      cellProp.fontFamily = "monospace";
      cellProp.fontColor = "#000000";
      cellProp.bgColor = "#000000";
      cellProp.alignment = "left";

      //UI
      cell.click();
    }
  }
  defaultSelectedCellUI();
});

pasteBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;

  let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
  let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

  let address = addressBar.value;
  let [startRow, startCol] = decodeIdFromAddressbar(address);

  for (let i = startRow, r = 0; i <= startRow + rowDiff; i++, r++) {
    for (let j = startCol, c = 0; j <= startCol + colDiff; j++, c++) {
      let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
      if (!cell) continue;

      let data = copyData[r][c];
      let cellProp = sheetDB[i][j];

      cellProp.value = data.value;
      cellProp.bold = data.bold;
      cellProp.italic = data.italic;
      cellProp.underlined = data.underlined;
      cellProp.fontSize = data.fontSize;
      cellProp.fontFamily = data.fontFamily;
      cellProp.fontColor = data.fontColor;
      cellProp.bgColor = data.bgColor;
      cellProp.alignment = data.alignment;

      // UI
      cell.click();
    }
  }
});
