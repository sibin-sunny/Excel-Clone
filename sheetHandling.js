let sheetFolderCont = document.querySelector(".sheet-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");
let activeSheetColor="#ced6e0"

addSheetBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetFolders.length);

  sheet.innerHTML = `
<div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>
`;
  sheetFolderCont.appendChild(sheet);

  createSheetDB();
  createGraphComponentMatrix();
  handleActiveSheet(sheet);
  handleSheetRemoval(sheet);
  sheet.click();
});

function handleSheetRemoval(sheet) {
  sheet.addEventListener("mousedown", (e) => {
    if (e.button !== 2) return;

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    if (allSheetFolders.length === 1) {
      alert("You need atleast one sheet");
      return;
    }

    let response = confirm(
      "Your sheet will be deleted permanently.Are you sure??"
    );
    if (response == false) return;
    
    let sheetIndex = Number(sheet.getAttribute("id"));

    //DB
    collectedSheetDb.splice(sheetIndex,1);
    collectedGraphComponenetMatrix.splice(sheetIndex,1)

    //UI
    handleSheetUiRemoval(sheet)

    //default select first sheet
    sheetDB=collectedSheetDb[0];
    graphComponentMatrix=collectedGraphComponenetMatrix[0];
    handleSheetProperties();
  });
}

function handleSheetUiRemoval(sheet){
  sheet.remove();
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for(let i=0;i<allSheetFolders.length;i++){
    allSheetFolders[i].setAttribute("id",i)
    let sheetContent=allSheetFolders[i].querySelector(".sheet-content");
    sheetContent.innerText=`sheet ${i+1}`
    allSheetFolders[i].style.backgroundColor="transparent"
  }
  allSheetFolders[0].style.backgroundColor=activeSheetColor;
}

function handleSheetDB(sheetIndex) {
  sheetDB = collectedSheetDb[sheetIndex];
  graphComponentMatrix = collectedGraphComponenetMatrix[sheetIndex];
}

function handleSheetUI(sheet) {
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = activeSheetColor;
}

function handleSheetProperties() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
      cell.click();
    }
  }
  //select frist cell deafault by DOM
  let firstCell = document.querySelector(".cell");
  firstCell.click();
}

function handleActiveSheet(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetIndex = Number(sheet.getAttribute("id"));
    handleSheetDB(sheetIndex);
    handleSheetProperties();
    handleSheetUI(sheet);
  });
}

function createSheetDB() {
  let sheetDB = [];
  for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
      let cellProp = {
        bold: false,
        italic: false,
        underlined: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: "14",
        fontColor: "#000000",
        bgColor: "#000000",
        value: "",
        formula: "",
        children: [],
      };
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
  }
  collectedSheetDb.push(sheetDB);
}

function createGraphComponentMatrix() {
  let graphComponentMatrix = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push([]);
    }
    graphComponentMatrix.push(row);
  }
  collectedGraphComponenetMatrix.push(graphComponentMatrix);
}
