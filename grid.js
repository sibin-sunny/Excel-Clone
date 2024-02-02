let rows = 100;
let cols = 26;

let addressRowsCont = document.querySelector(".address-row-cont");
let addressColsCont = document.querySelector(".address-col-cont");
let cellCont = document.querySelector(".cell-cont");
let addressBar=document.querySelector(".address-bar")

for (let i = 0; i < rows; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = i + 1;
  addressRowsCont.appendChild(addressRow);
}

for (let i = 0; i < cols; i++) {
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerText = String.fromCharCode(65 + i);
  addressColsCont.appendChild(addressCol);
}

for (let i = 0; i < rows; i++) {
  let cellRow = document.createElement("div");
  cellRow.setAttribute("class", "cell-row");
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable","true")
    cell.setAttribute("spellcheck","false")

    //cell idetification and storage
    cell.setAttribute("rowId",i)
    cell.setAttribute("colId",j)

    cellRow.appendChild(cell);
    addressBarDisplay(cell,i,j)
  }
  cellCont.appendChild(cellRow);
}

function addressBarDisplay(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowId = i+1;
    let colId = String.fromCharCode(65+j);
    addressBar.value=`${colId}${rowId}`
  });
}

