## Whats next?

- SIDEMOVMENT: CHECK IF THIS IS STILL TRUE
  - if you move sidways you can intersect with frozen blocks if the collision is corner vs corner.
- Add block rotation
- remove full rows
- start pause reset buttons
- score counter
- save score to file
- check that all loops work for arbitrary game board sizes. But not important.
- When finished: Good follow-up project would be to add more rendering options

  - ASCII
  - HTML5 canvas
  - webGL / webGPU

## 2024-05-12

- **10:15** - Starting to fix / add movment now with the new deltaTime system.

* **10:35** - Trying to move sideways movement logic to `keyDown()` from `gameLoop()`.
* **10:42** - **FINISHED** and everythings works. **Commiting changes.**

## 2024-05-11

Started a github account and added this project.

Game works. Blocks are spawned, blocks stop at the bottom. Game over happens if a frozen block exists in the top 3 rows.

Added side movment and quickdrop. Movment is not registered if keypress happens to fast (less than framTime). But its good enough now so i save that one for the end.

Cant get frame updates to work properly and input and animation looks and feels bad.
Made a new branch because i realised timing is fundamentally messed up. I need to redo al lthe timing logic with "requestAnimationFrame()" instead.

PUshed the branch changes to main since time works. Game logic needs to be fixed now.

## 2024-05-09

First attempt turned into incomprehensibility since everything happend in a single nested loop over the gameBoard array.

Rewrote everything and put every event in its own function to be called in order from the main game loop.

Also changed the gameBoard array so that it now is larger. This way it can include a bottom, edges and a spawn area.

## 2024-05-08

Wasted an hour doing the wrong things since i didnt remember what i was working on yesterday.

Starting a dev journal to fix this.

Removed the gameBoard buffer used to keep track of the next frame. Instead i loop "backwards", and update the gameBoard directly.
