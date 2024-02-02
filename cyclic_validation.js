let collectedGraphComponenetMatrix=[]
let graphComponentMatrix = [];

// for (let i = 0; i < rows; i++) {
//   let row = [];
//   for (let j = 0; j < cols; j++) {
//     row.push([]);
//   }
//   graphComponentMatrix.push(row);
// }

//cyclic=>true not cyclic=>false
function isGraphCyclic() {
  //dependecy => visited and dfsvisted 2D array; set default value false

  let visited = []; //node visit trace
  let dfsVisited = []; //stack visit trace
  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (let j = 0; j < cols; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = -0; j < cols; j++) {
        if(visited[i][j]===false){
            let response=dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
            if(response==true) return [i,j];
        }
    }
  }
  return null;
}

//start vis[i][j]=true dfsVis[i][j]=true
//end vis[i][j]=false
//if vis[i][j] => already explored path no need to check;
//cyclic detection condition if vis[i][j]=true && dfsVis[i][j]=true  -> true
//return true/false;

function dfsCycleDetection(
  graphComponentMatrix,
  srcr,
  srcc,
  visited,
  dfsVisited
) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  //A1[[0,1][2,1]...[]....]
  for (
    let children = 0;
    children < graphComponentMatrix[srcr][srcc].length;
    children++
  ) {
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
    if (visited[nbrr][nbrc] === false) {
      let response = dfsCycleDetection(
        graphComponentMatrix,
        nbrr,
        nbrc,
        visited,
        dfsVisited
      );
      if (response === true) return true; //found cycle no need to check further
    } else if (visited[nbrr][nbrc]===true && dfsVisited[nbrr][nbrc]===true) {
      return true; //found cycle no need to check further
    }
  }
  dfsVisited[srcr][srcc]=false;
  return false
}
