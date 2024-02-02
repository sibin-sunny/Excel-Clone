let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

//Download Task
downloadBtn.addEventListener("click", (e) => {
  let jsonData = JSON.stringify([sheetDB, graphComponentMatrix]);
  let file = new Blob([jsonData], { type: "applicaton/json" });

  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "sheetData.json";
  a.click();
});

//Open Task
openBtn.addEventListener("click", (e) => {
  //open file expolorer;
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change",(e)=>{
    let fr=new FileReader();
    let files=input.files;
    let fileObj=files[0];

    fr.readAsText(fileObj);
    fr.addEventListener("load",(e)=>{
        let readSheetData=JSON.parse(fr.result);

        //basic sheet with default data will be created
        addSheetBtn.click();

        //sheetDb graphComponent
        sheetDB=readSheetData[0];
        graphComponentMatrix=readSheetData[1];

        collectedSheetDb[collectedSheetDb.length-1]=sheetDB;
        collectedGraphComponenetMatrix[collectedGraphComponenetMatrix.length-1]=graphComponentMatrix;

        handleSheetProperties();

    })
  })
});
