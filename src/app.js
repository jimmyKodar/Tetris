/////////////////////////////////////////////////////////////////////////////
// GAME LOGIC
function isGameOver() {
  for (let i = 0; i < gameBoard[0].length; i++) {
    if (gameBoard[3][i] === -1) {
      console.log("GAME OVER");
      return true;
    }
  }
  return false;
}
function isNoBlockInPlay() {
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
function moveBlocksSideways() {
  if (false) {
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
  if (false) {
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
// GRAPHICS
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
// GAME LOOP
function gameLoop() {
  // Only update game logic if enough time have passed
  if (performance.now() - PrevUpdateTime > frameTime) {
    if (isSpawnFieldEmpty()) {
      moveBlocksSideways();
    }
    moveBlocksDown();

    if (isNoBlockInPlay()) {
      console.log("Spawning new block");
      spawnRandomBlock();
    }

    if (blockCollided()) {
      freezeBlocks();
    }
    PrevUpdateTime = performance.now();
  }

  render();
  if (!pauseGame) {
    requestAnimationFrame(gameLoop);
  }
}
/////////////////////////////////////////////////////////////////////////////
// TIME
let FPS = 5;
let frameTime = 1000 / FPS;
let PrevUpdateTime = performance.now();
let animationFrameRequestID;
let pauseGame = true;

function setFPS(reqestedFPS) {
  return (frameTime = 1000 / reqestedFPS);
}
/////////////////////////////////////////////////////////////////////////////
// CONTROLS
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
function keyDown(key) {
  if (key.key == " ") {
    if (!pauseGame) {
      pauseGame = true;
      cancelAnimationFrame(animationFrameRequestID);
      animationFrameRequestID = null;
    } else {
      pauseGame = false;
      animationFrameRequestID = requestAnimationFrame(gameLoop);
    }
  }
  if (key.key == "ArrowLeft") {
  }
  if (key.key == "ArrowRight") {
  }
  if (key.key == "ArrowDown") {
    setFPS(60);
  }
}
function keyUp(key) {
  if (key.key == "ArrowDown") {
    setFPS(5);
  }
}
/////////////////////////////////////////////////////////////////////////////
// INITIALIZE GAME & START LOOP
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
let gameBoardDiv = document.querySelector(".gameBoard");
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
function setGameBoard() {
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
createPixels();
setGameBoard();
animationFrameRequestID = requestAnimationFrame(gameLoop);
