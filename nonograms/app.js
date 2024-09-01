"use strict";

const task = [
  [0, 1, 0, 0, 0],
  [1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1],
  [1, 1, 0, 0, 1],
  [1, 0, 0, 0, 1]
];

/* POPUP */
const popup = document.createElement("div");
popup.className = "popup";

const popupContent = document.createElement("div");
popupContent.className = "popup-content";

let message = document.createElement("h2");
message.className = "message";
message.textContent = "Great! You have solved the nonogram!";
popupContent.appendChild(message);

let btnAgain = document.createElement("button");
btnAgain.className = "btn-play-again";
btnAgain.textContent = "one more time?";
popupContent.appendChild(btnAgain);

popup.appendChild(popupContent);
document.body.appendChild(popup);

// title
const title = document.createElement("h1");
title.className = "title";
title.textContent = "Nonograms Puzzle!";
document.body.appendChild(title);

//main section
const mainSection = document.createElement("main");
mainSection.className = "main";

const gameSection = document.createElement("section");
gameSection.className = "game-section";

const emptyCell = document.createElement("div");
emptyCell.className = "empty-cell";
emptyCell.textContent = "Good luck!";
gameSection.appendChild(emptyCell);

//count top clues
let cluesTop = 0;
let arrTopClues = [];
for (let i = 0; i < task[0].length; i++) {
  cluesTop = 0;
  let mini = [];
  for (let j = 0; j < task.length; j++) {
    if (task[j][i] === 1) {
      cluesTop++;
    } else if (cluesTop > 0) {
      mini.push(cluesTop);
      cluesTop = 0;
    }
  }
  if (cluesTop > 0) {
    mini.push(cluesTop);
  }
  arrTopClues.push(mini);
}
console.log(arrTopClues);


const addClues = (res) => {
  res.forEach((arr, index) => {
    // clueCell
    let clueCell = document.createElement("div");
    clueCell.classList.add("clue-cell");
    clueCell.setAttribute("data", `0:${index+1}`);
    // clueCell.textContent = `${index+1}`;
    if (arr.length > 1) {
        arr.forEach((item, innerIndex) => {
          let clueCellItem = document.createElement("div");
          clueCellItem.classList.add(`clue-cell${index+1}_item${innerIndex}`);
          clueCellItem.textContent = `${item}`;
          clueCell.appendChild(clueCellItem);
          // console.log(`res[${index}][${innerIndex}] = ${item}`);
        });
    } else if (arr.length === 1) {
        arr.forEach((item, innerIndex) => {
          clueCell.textContent = `${item}`;
          console.log(`res[${index}][${innerIndex}] = ${item}`);
        });
    }
    if (res === arrTopClues) {
      topClues.appendChild(clueCell);
    } else {
      leftClues.appendChild(clueCell);
    }
  });
}


const topClues = document.createElement("div");
topClues.className = "top-clues";
addClues(arrTopClues);
gameSection.appendChild(topClues);

// count left clues
let cluesLeft = 0;
let arrLeftClues = [];

for (let i = 0; i < task.length; i++) {
  arrLeftClues.push([]);
  cluesLeft = 0;
  for (let j = 0; j < task[i].length; j++) {
    if (task[i][j] === 1) {
      cluesLeft++;
      if(task[i][j + 1] === 0 || j === task[i].length - 1){
        arrLeftClues[i].push(cluesLeft);
        cluesLeft = 0;
      }
    }
  }
}

const leftClues = document.createElement("div");
leftClues.className = "left-clues";
addClues(arrLeftClues);
gameSection.appendChild(leftClues);

const gameField = document.createElement("div");
gameField.className = "game-field";

gameSection.appendChild(gameField);

mainSection.appendChild(gameSection);
document.body.appendChild(mainSection);

//task
const addTask = () => {
  for (let i = 0; i < task.length; i++) {
    for (let j = 0; j < task[i].length; j++) {
      let gameCell = document.createElement("div");
      gameCell.classList.add("game-cell");
      gameCell.setAttribute("data", `${i + 1}:${j + 1}`);
      gameField.appendChild(gameCell);
      gameCell.addEventListener(
        "click",
        event => startGame(event.target, `${i + 1}:${j + 1}`) //???
      );
    }
  }
};
addTask();

let resetMatrix = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

const startGame = (gameCell, clickedCell) => {
  gameCell.classList.toggle("fill");
  // let data = gameCell.getAttribute('data');
  // console.log(gameCell);
  // console.log(clickedCell);
  // console.log(data);

  let unSelectedCell = document.querySelectorAll(".game-cell");
  unSelectedCell.forEach(elem => {
    let info = elem.getAttribute("data");
    // console.log(info);
    for (let i = 0; i < resetMatrix.length; i++) {
      for (let j = 0; j < resetMatrix[i].length; j++) {
        if (info === `${i + 1}:${j + 1}`) {
          if (resetMatrix[i][j] === 1) {
            resetMatrix[i][j]--;
            // console.log(resetMatrix);
            isArraysEqual();
          }
        }
      }
    }
  });
  // console.log(unSelectedCell);
  let selectedCell = document.querySelectorAll(".game-cell.fill");
  // console.log(selectedCell);
  selectedCell.forEach(elem => {
    let info = elem.getAttribute("data");
    // console.log(info);
    for (let i = 0; i < resetMatrix.length; i++) {
      for (let j = 0; j < resetMatrix[i].length; j++) {
        if (info === `${i + 1}:${j + 1}`) {
          if (resetMatrix[i][j] === 0) {
            resetMatrix[i][j]++;
            isArraysEqual();
            // console.log(resetMatrix);
          }
        }
      }
    }
  });
};

const isArraysEqual = () => {
  if (resetMatrix.toString() === task.toString()) {
    // console.log("yeah");
    gameOver();
  } else {
    // console.log("no");
  }
};

const gameOver = () => {
  gameField.disabled = true;
  popup.classList.add("active");
};

const refresh = () => {
  popup.classList.remove("active");
  gameField
    .querySelectorAll("div")
    .forEach(elem => elem.classList.remove("fill"));
  refreshMatrix();
};

const refreshMatrix = () => {
  for (let i = 0; i < resetMatrix.length; i++) {
    for (let j = 0; j < resetMatrix[i].length; j++) {
      if (resetMatrix[i][j] === 1) {
        resetMatrix[i][j]--;
      }
    }
  }
};

refresh();
btnAgain.addEventListener("click", refresh);

// // left clues
// let clues = 0;
// let arr = [];

// for (let i = 0; i < task.length; i++) {
//   arr.push([]);
//   clues = 0;
//   for (let j = 0; j < task[i].length; j++) {
//     if (task[i][j] === 1) {
//       clues++;
//       if(task[i][j + 1] === 0 || j === task[i].length - 1){
//         arr[i].push(clues);
//         clues = 0;
//       }
//     }
//   }
// }

//top clues
// let clues = 0;
// let arr = [];

// for (let i = 0; i < task[0].length; i++) {
//   clues = 0;
//   let mini = [];
//   for (let j = 0; j < task.length; j++) {
//     if (task[j][i] === 1) {
//       clues++;
//     } else if (clues > 0) {
//       mini.push(clues);
//       clues = 0;
//     }
//   }
//   if (clues > 0) {
//       mini.push(clues);
//   }
//   arr.push(mini);
// }

// const res = [[1, 2],[4],[2],[1, 1],[1]];

// res.forEach((arr, index) => {
//   if (arr.length > 1) {
//       arr.forEach((item, innerIndex) => {
//           console.log(`res[${index}][${innerIndex}] = ${item}`);
//       });
//   } else if (arr.length === 1) {
//       arr.forEach((item, innerIndex) => {
//           console.log(`res[${index}][0][${innerIndex}] = ${item}`);
//       });
//   }
// });
