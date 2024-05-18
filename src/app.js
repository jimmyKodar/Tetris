/////////////////////////////////////////////////////////////////////////////
// GAME LOGIC
function startNewGame() {
  destroyBlocks();
  createBlocks();
  setGameBoard();
  animationFrameRequestID = requestAnimationFrame(gameLoop);
}
function isGameOver() {
  for (let i = 1; i < gameBoard[0].length - 1; i++) {
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
  for (i = 1; i < gameBoard[0].length - 1; i++) {
    if (gameBoard[0][i] === 1 || gameBoard[1][i] === 1 || gameBoard[2][i] === 1) {
      return false;
    }
  }
  return true;
}
function blockCollidedDownward() {
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
function rotateBlockClockwise() {
  // Checkar också så att det inte är supernära tills att blocken ska freeza.
  // Kunde bugga ibland om man pepprade rotate nära botten.
  // Block 2 = T-block
  if (blockNr == 2 && !blockCollidedDownward()) {
    if (rotationState == 1) {
      for (let row = 1; row < gameBoard[0].length - 1; row++) {
        for (let column = 0; column < gameBoard.length - 1; column++) {
          if (gameBoard[column][row] === 1 && gameBoard[column + 1][row + 1] === 0) {
            gameBoard[column][row] = 0;
            gameBoard[column + 1][row + 1] = 1;
            rotationState = 2;
            return;
          }
        }
      }
    }
    if (rotationState == 2) {
      for (let column = 0; column < gameBoard.length - 1; column++) {
        for (let row = 1; row < gameBoard[0].length - 1; row++) {
          if (gameBoard[column][row] === 1 && gameBoard[column + 1][row - 1] === 0) {
            gameBoard[column][row] = 0;
            gameBoard[column + 1][row - 1] = 1;
            rotationState = 3;
            return;
          }
        }
      }
    }
    if (rotationState == 3) {
      for (let row = gameBoard[0].length - 1; row >= 1; row--) {
        for (let column = 0; column < gameBoard.length - 1; column++) {
          if (gameBoard[column][row] === 1 && gameBoard[column - 1][row - 1] === 0) {
            gameBoard[column][row] = 0;
            gameBoard[column - 1][row - 1] = 1;
            rotationState = 4;
            return;
          }
        }
      }
    }
    if (rotationState == 4) {
      for (let row = gameBoard[0].length - 1; row >= 1; row--) {
        for (let column = gameBoard.length - 1; column >= 0; column--) {
          if (gameBoard[column][row] === 1 && gameBoard[column - 1][row + 1] === 0) {
            gameBoard[column][row] = 0;
            gameBoard[column - 1][row + 1] = 1;
            rotationState = 1;
            return;
          }
        }
      }
    }
  }
  // Block 3 = S-block
  if (blockNr == 3 && !blockCollidedDownward()) {
    if (rotationState == 1) {
      // rightmost down
      for (let row = gameBoard[0].length - 1; row >= 1; row--) {
        for (let column = 0; column < gameBoard.length - 1; column++) {
          // OBS KOLLAR BÅDA TARGETS EFTERSOM DET ÄR TVÅ BLOCKS SOM FLYTTAS
          if (gameBoard[column][row] === 1 && gameBoard[column + 1][row] === 0 && gameBoard[column + 2][row] === 0) {
            // move one block
            gameBoard[column][row] = 0;
            gameBoard[column + 1][row] = 1;
            // move the second block
            gameBoard[column + 1][row - 2] = 0;
            gameBoard[column + 2][row] = 1;

            rotationState = 2;
            return;
          }
        }
      }
    }
    if (rotationState == 2) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (gameBoard[y][x] === 1 && gameBoard[y + 2][x] === 0 && gameBoard[y + 2][x - 1] === 0) {
            gameBoard[y][x] = 0;
            gameBoard[y + 2][x] = 1;

            gameBoard[y + 2][x + 1] = 0;
            gameBoard[y + 2][x - 1] = 1;
            rotationState = 3;
            return;
          }
        }
      }
    }
    if (rotationState == 3) {
      for (let x = gameBoard[0].length - 1; x > 0; x--) {
        for (let y = 0; y < gameBoard.length - 1; y++) {
          if (gameBoard[y][x] === 1 && gameBoard[y][x - 2] == 0 && gameBoard[y - 1][x - 2] == 0) {
            gameBoard[y][x] = 0;
            gameBoard[y][x - 2] = 1;

            gameBoard[y + 1][x - 2] = 0;
            gameBoard[y - 1][x - 2] = 1;
            rotationState = 4;
            return;
          }
        }
      }
    }

    if (rotationState == 4) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (gameBoard[y][x] === 1 && gameBoard[y][x + 2] == 0 && gameBoard[y][x + 1] == 0) {
            gameBoard[y][x] = 0;
            gameBoard[y][x + 2] = 1;

            gameBoard[y + 2][x + 1] = 0;
            gameBoard[y][x + 1] = 1;

            rotationState = 1;
            return;
          }
        }
      }
    }
  }
  // Block 4 = Z-block
  if (blockNr == 4 && !blockCollidedDownward()) {
    if (rotationState == 1) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (gameBoard[y][x] === 1 && gameBoard[y][x + 2] == 0 && gameBoard[y + 2][x + 1] == 0) {
            gameBoard[y][x] = 0;
            gameBoard[y][x + 2] = 1;

            gameBoard[y][x + 1] = 0;
            gameBoard[y + 2][x + 1] = 1;

            rotationState = 2;
            return;
          }
        }
      }
    }
    if (rotationState == 2) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (gameBoard[y][x] === 1 && gameBoard[y + 2][x] == 0 && gameBoard[y + 1][x - 2] == 0) {
            gameBoard[y][x] = 0;
            gameBoard[y + 2][x] = 1;

            gameBoard[y + 1][x] = 0;
            gameBoard[y + 1][x - 2] = 1;

            rotationState = 3;
            return;
          }
        }
      }
    }
    if (rotationState == 3) {
      for (let y = gameBoard.length - 1; y >= 0; y--) {
        for (let x = gameBoard[0].length - 1; x >= 0; x--) {
          if (gameBoard[y][x] === 1 && gameBoard[y][x - 2] == 0 && gameBoard[y - 2][x - 1] == 0) {
            gameBoard[y][x] = 0;
            gameBoard[y][x - 2] = 1;

            gameBoard[y][x - 1] = 0;
            gameBoard[y - 2][x - 1] = 1;

            rotationState = 4;
            return;
          }
        }
      }
    }
    if (rotationState == 4) {
      for (let y = gameBoard.length - 1; y >= 0; y--) {
        for (let x = gameBoard[0].length - 1; x >= 0; x--) {
          if (gameBoard[y][x] === 1 && gameBoard[y - 2][x] == 0 && gameBoard[y - 1][x + 2] == 0) {
            gameBoard[y][x] = 0;
            gameBoard[y - 2][x] = 1;

            gameBoard[y - 1][x] = 0;
            gameBoard[y - 1][x + 2] = 1;

            rotationState = 1;
            return;
          }
        }
      }
    }
  }
  // Block 5 = L-block
  if (blockNr == 5 && !blockCollidedDownward()) {
    if (rotationState == 1) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y - 2][x] == 0 &&
            gameBoard[y + 2][x - 1] == 0 &&
            gameBoard[y][x - 1] == 0
          ) {
            gameBoard[y][x] = 0;
            gameBoard[y + 2][x] = 1;

            gameBoard[y + 1][x] = 0;
            gameBoard[y + 2][x - 1] = 1;

            gameBoard[y + 1][x - 2] = 0;
            gameBoard[y][x - 1] = 1;

            rotationState = 2;
            return;
          }
        }
      }
    }
    if (rotationState == 2) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y + 1][x + 1] == 0 &&
            gameBoard[y + 1][x - 1] == 0 &&
            gameBoard[y + 2][x - 1] == 0
          ) {
            // c
            gameBoard[y][x] = 0;
            gameBoard[y + 1][x + 1] = 1;
            // b
            gameBoard[y + 2][x] = 0;
            gameBoard[y + 1][x - 1] = 1;
            // a
            gameBoard[y + 2][x + 1] = 0;
            gameBoard[y + 2][x - 1] = 1;

            rotationState = 3;
            return;
          }
        }
      }
    }
    if (rotationState == 3) {
      for (let y = gameBoard.length - 1; y >= 0; y--) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y - 2][x] == 0 &&
            gameBoard[y - 2][x + 1] == 0 &&
            gameBoard[y][x + 1] == 0
          ) {
            // a
            gameBoard[y][x] = 0;
            gameBoard[y - 2][x] = 1;
            // b
            gameBoard[y - 1][x] = 0;
            gameBoard[y - 2][x + 1] = 1;
            // c
            gameBoard[y - 1][x + 2] = 0;
            gameBoard[y][x + 1] = 1;

            rotationState = 4;
            return;
          }
        }
      }
    }
    if (rotationState == 4) {
      for (let y = gameBoard.length - 1; y >= 0; y--) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y - 1][x - 1] == 0 &&
            gameBoard[y - 1][x + 1] == 0 &&
            gameBoard[y - 2][x + 1] == 0
          ) {
            // c
            gameBoard[y][x] = 0;
            gameBoard[y - 1][x - 1] = 1;
            // b
            gameBoard[y - 2][x] = 0;
            gameBoard[y - 1][x + 1] = 1;
            // a
            gameBoard[y - 2][x - 1] = 0;
            gameBoard[y - 2][x + 1] = 1;

            rotationState = 1;
            return;
          }
        }
      }
    }
  }
  // block 6 = J-block
  if (blockNr == 6 && !blockCollidedDownward()) {
    if (rotationState == 1) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y][x + 2] == 0 &&
            gameBoard[y][x + 1] == 0 &&
            gameBoard[y + 2][x + 1] == 0
          ) {
            gameBoard[y][x] = 0;
            gameBoard[y][x + 2] = 1;

            gameBoard[y + 1][x] = 0;
            gameBoard[y][x + 1] = 1;

            gameBoard[y + 1][x + 2] = 0;
            gameBoard[y + 2][x + 1] = 1;

            rotationState = 2;
            return;
          }
        }
      }
    }
    if (rotationState == 2) {
      for (let y = gameBoard.length - 1; y >= 0; y--) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y - 1][x - 1] == 0 &&
            gameBoard[y - 1][x + 1] == 0 &&
            gameBoard[y][x + 1] == 0
          ) {
            // c
            gameBoard[y][x] = 0;
            gameBoard[y - 1][x - 1] = 1;
            // b
            gameBoard[y - 2][x] = 0;
            gameBoard[y - 1][x + 1] = 1;
            // a
            gameBoard[y - 2][x + 1] = 0;
            gameBoard[y][x + 1] = 1;

            rotationState = 3;
            return;
          }
        }
      }
    }
    if (rotationState == 3) {
      for (let y = gameBoard.length - 1; y >= 0; y--) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y][x - 2] == 0 &&
            gameBoard[y][x - 1] == 0 &&
            gameBoard[y - 2][x - 1] == 0
          ) {
            // a
            gameBoard[y][x] = 0;
            gameBoard[y][x - 2] = 1;
            // b
            gameBoard[y - 1][x] = 0;
            gameBoard[y][x - 1] = 1;
            // c
            gameBoard[y - 1][x - 2] = 0;
            gameBoard[y - 2][x - 1] = 1;

            rotationState = 4;
            return;
          }
        }
      }
    }
    if (rotationState == 4) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y + 1][x + 1] == 0 &&
            gameBoard[y + 1][x - 1] == 0 &&
            gameBoard[y][x - 1] == 0
          ) {
            // c
            gameBoard[y][x] = 0;
            gameBoard[y + 1][x + 1] = 1;
            // b
            gameBoard[y + 2][x] = 0;
            gameBoard[y + 1][x - 1] = 1;
            // a
            gameBoard[y + 2][x - 1] = 0;
            gameBoard[y][x - 1] = 1;

            rotationState = 1;
            return;
          }
        }
      }
    }
  }
  if (blockNr == 7 && !blockCollidedDownward()) {
    if (rotationState == 1) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y - 1][x + 2] == 0 &&
            gameBoard[y + 1][x + 2] == 0 &&
            gameBoard[y + 2][x + 2] == 0
          ) {
            // a
            gameBoard[y][x] = 0;
            gameBoard[y - 1][x + 2] = 1;

            gameBoard[y][x + 1] = 0;
            gameBoard[y + 1][x + 2] = 1;

            gameBoard[y][x + 3] = 0;
            gameBoard[y + 2][x + 2] = 1;

            rotationState = 2;
            return;
          }
        }
      }
    }
    if (rotationState == 2) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y + 2][x - 2] == 0 &&
            gameBoard[y + 2][x - 1] == 0 &&
            gameBoard[y + 2][x + 1] == 0
          ) {
            // a
            gameBoard[y][x] = 0;
            gameBoard[y + 2][x - 2] = 1;

            gameBoard[y + 1][x] = 0;
            gameBoard[y + 2][x - 1] = 1;

            gameBoard[y + 3][x] = 0;
            gameBoard[y + 2][x + 1] = 1;

            rotationState = 3;
            return;
          }
        }
      }
    }
    if (rotationState == 3) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y - 2][x + 1] == 0 &&
            gameBoard[y + 1][x + 1] == 0 &&
            gameBoard[y - 1][x + 1] == 0
          ) {
            // a
            gameBoard[y][x] = 0;
            gameBoard[y - 2][x + 1] = 1;

            gameBoard[y][x + 2] = 0;
            gameBoard[y + 1][x + 1] = 1;

            gameBoard[y][x + 3] = 0;
            gameBoard[y - 1][x + 1] = 1;

            rotationState = 4;
            return;
          }
        }
      }
    }
    if (rotationState == 4) {
      for (let y = 0; y < gameBoard.length - 1; y++) {
        for (let x = 1; x < gameBoard[0].length - 1; x++) {
          if (
            gameBoard[y][x] === 1 &&
            gameBoard[y + 1][x - 1] == 0 &&
            gameBoard[y + 1][x + 1] == 0 &&
            gameBoard[y + 1][x + 2] == 0
          ) {
            // a
            gameBoard[y][x] = 0;
            gameBoard[y + 1][x - 1] = 1;

            gameBoard[y + 2][x] = 0;
            gameBoard[y + 1][x + 1] = 1;

            gameBoard[y + 3][x] = 0;
            gameBoard[y + 1][x + 2] = 1;

            rotationState = 1;
            return;
          }
        }
      }
    }
  }
}
function spawnRandomBlock() {
  blockNr = 1 + Math.floor(Math.random() * 7);
  // spawn O-block
  if (blockNr == 1) {
    gameBoard[0][5] = 1;
    gameBoard[0][6] = 1;
    gameBoard[1][5] = 1;
    gameBoard[1][6] = 1;
  }
  // spawn T-block
  if (blockNr == 2) {
    gameBoard[0][5] = 1;
    gameBoard[1][5] = 1;
    gameBoard[1][4] = 1;
    gameBoard[1][6] = 1;
  }
  // spawn S-block
  if (blockNr == 3) {
    gameBoard[0][5] = 1;
    gameBoard[1][5] = 1;
    gameBoard[1][4] = 1;
    gameBoard[0][6] = 1;
  }
  // spawn Z-block
  if (blockNr == 4) {
    gameBoard[0][4] = 1;
    gameBoard[0][5] = 1;
    gameBoard[1][5] = 1;
    gameBoard[1][6] = 1;
  } // spawn L-block
  if (blockNr == 5) {
    gameBoard[0][6] = 1;
    gameBoard[1][4] = 1;
    gameBoard[1][5] = 1;
    gameBoard[1][6] = 1;
  }
  if (blockNr == 6) {
    gameBoard[0][4] = 1;
    gameBoard[1][4] = 1;
    gameBoard[1][5] = 1;
    gameBoard[1][6] = 1;
  }
  if (blockNr == 7) {
    gameBoard[1][3] = 1;
    gameBoard[1][4] = 1;
    gameBoard[1][5] = 1;
    gameBoard[1][6] = 1;
  }
}
function moveDown() {
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
function moveLeft() {
  // Loop backwards so that gameBoard can be any length
  for (let i = gameBoard.length - 1; i >= 0; i--) {
    // loop --> LEFT to RIGHT to not write over blocks
    for (let j = 1; j <= 10; j++) {
      if (gameBoard[i][j] === 1) {
        gameBoard[i][j] = 0;
        gameBoard[i][j - 1] = 1;
      }
    }
  }
}
function moveRight() {
  // Loop backwards so that gameBoard can be any length
  for (let i = gameBoard.length - 1; i >= 0; i--) {
    // loop <-- RIGHT to LEFT  to not write over blocks
    for (let j = gameBoard[0].length - 2; j >= 1; j--) {
      if (gameBoard[i][j] === 1) {
        gameBoard[i][j] = 0;
        gameBoard[i][j + 1] = 1;
      }
    }
  }
}
function collideLeft() {
  for (let i = gameBoard.length - 2; i >= 0; i--) {
    for (let j = 0; j <= gameBoard[0].length - 2; j++) {
      // checking left
      if (gameBoard[i][j] === 1 && gameBoard[i][j - 1] === -1) {
        return true;
      }
    }
  }
  return false;
}
function collideRight() {
  for (let i = gameBoard.length - 2; i >= 0; i--) {
    for (let j = gameBoard[0].length - 2; j >= 1; j--) {
      // checking RIGHT
      if (gameBoard[i][j] === 1 && gameBoard[i][j + 1] === -1) {
        return true;
      }
    }
  }
  return false;
}
function setFPS(reqestedFPS) {
  return (frameTime = 1000 / reqestedFPS);
}
/////////////////////////////////////////////////////////////////////////////
//////////////////////         GLOBALS         //////////////////////////////
/////////////////////////////////////////////////////////////////////////////
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

// time globals
const defaultFPS = 3;
const quickDropFPS = 60;
let frameTime = 1000 / defaultFPS;
let PrevUpdateTime = performance.now();
let animationFrameRequestID;
let pauseGame = false;
// rotation globals: rotation state är en int från 1->4 som håller koll på blocken snurr. Nollställs varje freeze
let blockNr = 1 + Math.floor(Math.random() * 7);
rotationState = 1;
// keyboard globals
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
/////////////////////////////////////////////////////////////////////////////
// GAME LOOP
function gameLoop() {
  if (isGameOver()) {
    startNewGame();
    return;
  }
  // Only update game logic if enough time have passed
  if (performance.now() - PrevUpdateTime >= frameTime) {
    if (blockCollidedDownward()) {
      freezeBlocks();
      rotationState = 1;
    } else {
      moveDown();
    }

    if (isNoBlockInPlay()) {
      console.log("Spawning new block");
      spawnRandomBlock();
    }

    PrevUpdateTime = performance.now();
  }

  render();
  if (!pauseGame) {
    requestAnimationFrame(gameLoop);
  }
}
/////////////////////////////////////////////////////////////////////////////
// CONTROLS
function keyDown(key) {
  if (key.key == "ArrowLeft") {
    if (isSpawnFieldEmpty() && !collideLeft()) {
      moveLeft();
    }
  }
  if (key.key == "ArrowRight") {
    if (isSpawnFieldEmpty() && !collideRight()) {
      moveRight();
    }
  }
  if (key.key == "ArrowUp") {
    if (isSpawnFieldEmpty()) {
      rotateBlockClockwise();
    }
  }
  if (key.key == "ArrowDown") {
    setFPS(quickDropFPS);
  }
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
}
function keyUp(key) {
  if (key.key == "ArrowDown") {
    setFPS(defaultFPS);
  }
}
/////////////////////////////////////////////////////////////////////////////
// GRAPHICS
function blockColor() {
  if (blockNr == 1) {
    return "oBlock";
  }
  if (blockNr == 2) {
    return "tBlock";
  }
  if (blockNr == 3) {
    return "sBlock";
  }
  if (blockNr == 4) {
    return "zBlock";
  }
  if (blockNr == 5) {
    return "lBlock";
  }
  if (blockNr == 6) {
    return "jBlock";
  }
  if (blockNr == 7) {
    return "iBlock";
  }
}
function render() {
  for (let i = 0; i < gameBoard.length - 1; i++) {
    for (let j = 1; j < gameBoard[0].length - 1; j++) {
      if (gameBoard[i][j] === 1) {
        document.getElementById(`${j},${i}`).classList.remove("backgroundBlock");
        document.getElementById(`${j},${i}`).classList.add("liveBlock");
        document.getElementById(`${j},${i}`).classList.add(blockColor());
      }
      if (gameBoard[i][j] === 0) {
        document.getElementById(`${j},${i}`).classList.remove("liveBlock", blockColor());
        document.getElementById(`${j},${i}`).classList.add("backgroundBlock");
      }
      if (gameBoard[i][j] === -1) {
        document.getElementById(`${j},${i}`).classList.add("frozenBlock");
      }
      if (i <= 2) {
        document.getElementById(`${j},${i}`).classList.add("spawnAreaBlock");
      }
    }
  }
}
function createBlocks() {
  for (let i = gameBoard.length - 1; i >= 0; i--) {
    for (let j = gameBoard[0].length - 1; j >= 0; j--) {
      tmpDiv = document.createElement("div");
      tmpDiv.classList.add("block");
      tmpDiv.id = `${j},${i}`;
      tmpDiv.style.transform = `translate(${j * 10}px,${i * 10}px)`;
      gameBoardDiv.appendChild(tmpDiv);
    }
  }
}
function destroyBlocks() {
  gameBoardDiv.innerHTML = "";
}
function setGameBoard() {
  for (let y = 0; gameBoard.length - 1 > y; y++) {
    for (let x = 0; gameBoard[0].length - 1 > x; x++) {
      gameBoard[y][x] = 0;
    }
  }
  // bottom
  for (let i = 0; i < gameBoard[i].length; i++) {
    gameBoard[gameBoard.length - 1][i] = -1;
    //document.getElementById(`${i},${gameBoard.length - 1}`).style.backgroundColor = "red";
    document.getElementById(`${i},${gameBoard.length - 1}`).classList.add("bottomEdge");
  }
  // sides
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i][0] = -1;
    gameBoard[i][gameBoard[0].length - 1] = -1;
    document.getElementById(`${0},${i}`).classList.add("sideEdge");
    document.getElementById(`${gameBoard[0].length - 1},${i}`).classList.add("sideEdge");
  }
}
/////////////////////////////////////////////////////////////////////////////
// START GAME
startNewGame();
