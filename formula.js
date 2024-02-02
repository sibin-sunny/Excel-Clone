for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [cell, cellProp] = getCellAndCellProps(address);
      let enteredData = cell.innerText;

      if (enteredData === cellProp.value) return;

      cellProp.value = enteredData;

      // removeChildcellFromParentcell(cellProp.formula);
      // cellProp.formula = "";
      updateChildrenCell(address);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async (e) => {
  inputFormula = formulaBar.value;

  if (e.key === "Enter" && inputFormula) {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProps(address);
    if (inputFormula != cellProp.formula) {
      removeChildcellFromParentcell(cellProp.formula);
    }
    addChildToGraphMatrix(inputFormula, address);
    // Before evaluvating check whether formula is cyclic or not
    let cyclicResponse = isGraphCyclic();
    if (cyclicResponse) {
      // alert("you have cyclic formula")
      let response = confirm(
        "You have cyclic Formula. Do you want to trace the cyclic path"
      );
      while (response == true) {
        //retain the trace until the user needed
        await isGraphCyclicTracePath(graphComponentMatrix, cyclicResponse);
        response = confirm(
          "You have cyclic Formula. Do you want to trace the cyclic path"
        );
      }
      removeChildFromGraphComponent(inputFormula, address);
      return;
    }

    let evaluvatedValue = evaluvateFormula(inputFormula);

    //ui update
    setCellUiandCellProp(evaluvatedValue, inputFormula, address);
    addChildcellToParentcell(inputFormula);
    updateChildrenCell(address);
    console.log(sheetDB);
  }
});

function addChildToGraphMatrix(formula, childAddress) {
  let [cRowId, cColId] = decodeIdFromAddressbar(childAddress);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [pRowId, pColId] = decodeIdFromAddressbar(encodedFormula[i]);
      console.log(pRowId, pColId);
      graphComponentMatrix[pRowId][pColId].push([cRowId, cColId]);
    }
  }
}

function removeChildFromGraphComponent(formula, childAddress) {
  let [cRowId, cColId] = decodeIdFromAddressbar(childAddress);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [pRowId, pColId] = decodeIdFromAddressbar(encodedFormula[i]);
      graphComponentMatrix[pRowId][pColId].pop();
    }
  }
}

function updateChildrenCell(parentCellAddress) {
  let [parentCell, parentCellProp] = getCellAndCellProps(parentCellAddress);
  let children = parentCellProp.children;
  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = getCellAndCellProps(childAddress);
    let childFormula = childCellProp.formula;

    let evaluvatedValue = evaluvateFormula(childFormula);
    setCellUiandCellProp(evaluvatedValue, childFormula, childAddress);
    updateChildrenCell(childAddress);
  }
}

function addChildcellToParentcell(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProps(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildcellFromParentcell(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProps(encodedFormula[i]);
      let index = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(index, 1);
    }
  }
}

function evaluvateFormula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = getCellAndCellProps(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedformula = encodedFormula.join(" ");
  return eval(decodedformula);
}

function setCellUiandCellProp(value, formula, address) {
  let [cell, cellProp] = getCellAndCellProps(address);
  //UI update
  cell.innerText = value;

  //Db update;
  cellProp.value = value;
  cellProp.formula = formula;
}
