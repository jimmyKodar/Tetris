/////////////////////////////////////////////////////////////////////////////
// GAME LOGIC
function startGame() {
  if (!gameTimeIntervalID) {
    gameTimeIntervalID = setInterval(gameLoop, frameTime);
  }
}
function pauseGame() {
  clearInterval(gameTimeIntervalID);
  gameTimeIntervalID = null;
}
function isGameOver() {
  for (let i = 0; i < gameBoard[0].length; i++) {
    if (gameBoard[3][i] === -1) {
      console.log("GAME OVER");
      return true;
    }
  }
  return false;
}
function removeFullRows() {
  for (let i = 0; i < gameBoard.length; i++) {
    let counter = 1;
    for (let j = 0; j < gameBoard[0].length; j++) {
      counter += gameBoard[i][j];
      if (counter === gameBoard[0].length) {
        console.log(`row at index ${i} is full`);
        // move all -1" pixels above "i" down one step
      }
    }
  }
}
function noBlockInPlay() {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 1; j < gameBoard[0].length - 1; j++) {
      if (gameBoard[i][j] === 1) {
        return false;
      }
    }
  }
  return true;
}
function isSpawnFieldEmpty() {
  return true;
}
function spawnRandomBlock() {
  blockNr = 1 + Math.floor(Math.random() * 7);

  // spawn O-block (square)
  if (true) {
    gameBoard[0][5] = 1;
    gameBoard[0][6] = 1;
    gameBoard[1][5] = 1;
    gameBoard[1][6] = 1;
  }
}
function blockCollided() {
  for (let i = 0; i < gameBoard.length - 1; i++) {
    for (let j = 1; j < gameBoard[0].length - 1; j++) {
      if (gameBoard[i][j] === 1 && gameBoard[i + 1][j] === -1) {
        return true;
      }
    }
  }
  return false;
}
function freezeBlocks() {
  for (let i = 3; i < gameBoard.length; i++) {
    for (let j = 1; j < gameBoard[0].length - 1; j++) {
      if (gameBoard[i][j] === 1) {
        gameBoard[i][j] = -1;
      }
    }
  }
}
function moveBlocksDown() {
  // loop backwards so next row is not over written
  for (let i = gameBoard.length - 2; i >= 0; i--) {
    for (let j = 1; j < gameBoard[0].length - 1; j++) {
      if (gameBoard[i][j] === 1) {
        gameBoard[i + 1][j] = 1;
        gameBoard[i][j] = 0;
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////
// DEBUG
function addFullRow(rowNr) {
  for (let i = 0; i < gameBoard[0].length; i++) {
    gameBoard[rowNr][i] = 1;
  }
}
/////////////////////////////////////////////////////////////////////////////
// GRAPHICS
const gameBoardDiv = document.querySelector(".gameBoard");
gameBoardDiv.style.backgroundColor = "magenta"; // easier to spot if BG shows between blocks

function setupGameBoard() {
  for (let i = 0; i < gameBoard[i].length; i++) {
    gameBoard[gameBoard.length - 1][i] = -1;
    document.getElementById(`${i},${gameBoard.length - 1}`).style.backgroundColor = "#c00000";
  }
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i][0] = 1;
    gameBoard[i][gameBoard[0].length - 1] = 1;
    document.getElementById(`${0},${i}`).style.backgroundColor = "black";
    document.getElementById(`${gameBoard[0].length - 1},${i}`).style.backgroundColor = "black";
  }
}
function createPixels() {
  for (let i = gameBoard.length - 1; i >= 0; i--) {
    for (let j = gameBoard[0].length - 1; j >= 0; j--) {
      tmpDiv = document.createElement("div");
      tmpDiv.classList.add("pixel");
      tmpDiv.id = `${j},${i}`;
      tmpDiv.style.transform = `translate(${j * 10}px,${i * 10}px)`;
      gameBoardDiv.appendChild(tmpDiv);
    }
  }
}
function render() {
  for (let i = 0; i < gameBoard.length - 1; i++) {
    for (let j = 1; j < gameBoard[0].length - 1; j++) {
      if (gameBoard[i][j] === 1) {
        document.getElementById(`${j},${i}`).style.backgroundColor = "black";
      }
      if (gameBoard[i][j] === 0) {
        document.getElementById(`${j},${i}`).style.backgroundColor = "white";
      }
      if (gameBoard[i][j] === -1) {
        document.getElementById(`${j},${i}`).style.backgroundColor = "red";
      }
    }
  }
}
/////////////////////////////////////////////////////////////////////////////
// INIT
const gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
createPixels();
setupGameBoard();

let gameTimeIntervalID;
let frameTime = 200;
let currentFrame = 1;
let prevFrame = 0;
/////////////////////////////////////////////////////////////////////////////
// CONTROLS
document.querySelector("#startButton").addEventListener("click", startGame);
document.querySelector("#pauseButton").addEventListener("click", pauseGame);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

let moveLeft = false;
let moveRight = false;

function keyDown(key) {
  if (key.key == "ArrowLeft") {
    moveLeft = true;
    moveRight = false;
  }
  if (key.key == "ArrowRight") {
    moveLeft = false;
    moveRight = true;
  }
  if (key.key == "ArrowDown" && frameTime > 25) {
    frameTime = 25;
    pauseGame();
    startGame();
  }
}
function keyUp(key) {
  if (key.key == "ArrowLeft") {
    moveLeft = false;
  }
  if (key.key == "ArrowRight") {
    moveRight = false;
  }

  if (key.key == "ArrowDown") {
    frameTime = 200;
    pauseGame();
    startGame();
  }
}

function moveBlocksSideways() {
  if (moveRight) {
    // Loop backwards so that gameBoard can be any length
    for (let i = gameBoard.length - 1; i >= 0; i--) {
      // loop <-- RIGHT to LEFT  to not write over blocks
      for (let j = gameBoard[0].length - 2; j >= 1; j--) {
        if (gameBoard[i][j] === 1 && gameBoard[i][j + 1] === 0) {
          gameBoard[i][j] = 0;
          gameBoard[i][j + 1] = 1;
        }
      }
    }
  }
  if (moveLeft) {
    // Loop backwards so that gameBoard can be any length
    for (let i = gameBoard.length - 1; i >= 0; i--) {
      // loop --> LEFT to RIGHT to not write over blocks
      for (let j = 1; j <= 10; j++) {
        if (gameBoard[i][j] === 1 && gameBoard[i][j - 1] === 0) {
          gameBoard[i][j] = 0;
          gameBoard[i][j - 1] = 1;
        }
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////
// GAME LOOP
function gameLoop() {
  if (isSpawnFieldEmpty()) {
    moveBlocksSideways();
  }
  moveBlocksDown();

  if (noBlockInPlay()) {
    console.log("Spawning new block");
    spawnRandomBlock();
  }

  if (blockCollided()) {
    freezeBlocks();
  }

  if (isGameOver()) {
    clearInterval(gameTimeIntervalID);
    gameTimeIntervalID = null;
  }

  render();
}
