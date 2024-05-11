## Whats next?

- add side movment
- add "quick drop". (arrowDown = 10x frameTime)
- Add block rotation
- remove full rows
- start pause reset buttons
- score counter
- save score to file
- When finished: Good follow-up project would be to add more rendering options
  - ASCII
  - HTML5 canvas
  - webGL / webGPU

## 2024-05-11

Started a github account and added this project.

Game works. Blocks are spawned, blocks stop at the bottom. Game over happens if a frozen block exists in the top 3 rows.

## 2024-05-09

First attempt turned into incomprehensibility since everything happend in a single nested loop over the gameBoard array.

Rewrote everything and put every event in its own function to be called in order from the main game loop.

Also changed the gameBoard array so that it now is larger. This way it can include a bottom, edges and a spawn area.

## 2024-05-08

Wasted an hour doing the wrong things since i didnt remember what i was working on yesterday.

Starting a dev journal to fix this.

Removed the gameBoard buffer used to keep track of the next frame. Instead i loop "backwards", and update the gameBoard directly.
