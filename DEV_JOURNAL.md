## Whats next?

- Add block rotation
- remove full rows
- start pause reset buttons
- score counter
- save score to file
- check that all loops work for arbitrary game board sizes. But not important.
- Side movment: Minor issue, holding down the keys has a lag to it, the browser has a delay before it triggers repeat on a held down key. a toggle would feel nicer.
- When finished: Good follow-up project would be to add more rendering options

  - ASCII
  - HTML5 canvas
  - webGL / webGPU

## 2024-05-17

- **22:04** - Start to add next block type. Z-block.

* **22:28** - Z-block done.

## 2024-05-16

- **22:26** - Forgot to note start time but spent perhaps 40minutes implementing the S-block rotations.

## 2024-05-15

- **10:00** - Got sime time over so continuing on T-block rotation.
- **10:34** - FInished rotation for the T-block but there is a bug when the block freezes. Sometimes it erases frozen blocks.

* **20:39** - Playing around with CSS
* **21:38** - much nices graphics now. Fun! Also fixed the collision bug. I check for if freeze will happen and forbid rotation on those frames.

## 2024-05-14

- **22:26** - Got some time over so will add atleast one more rotation to the T-block

* **22:40** - Boom, done. Also added checks for rotation so that there must be space for rotation to occur.

## 2024-05-12

- **10:15** - Starting to fix / add movment now with the new deltaTime system.

* **10:35** - Trying to move sideways movement logic to `keyDown()` from `gameLoop()`.
* **10:42** - **FINISHED** and everythings works. **Commiting changes.**

* **10:55** - starting work on the collision detection for side movment, trying to fix the corner to corner intersection bug.

* **11:10** - Got side tracked a bit and fixed a bunch of small stuff.

  - side movment is not possible on the first 3 rows
  - spawn area is hidden by painting them gray.

  Now getting back to the collision stuff.

  - **11:29** - removeds side collision checks form moveLeft/right functions. Will put them in separete check functions.

  * **11:45** - Move partially complete. Sideways collision is now in two collidLeft/Right functions. The bug where it would eat up edges when "sliding" over corners is gone. But the main big of intersecting corners remain.

* **12:01** - Everything with side collision seems to work now. `MAJOR LESSON LEARNED:` ALl along i have been thinking correctly about how to check collisions. But the reason it dint work is that i tried to do too much in each function. Now its super simple when I split up the checks in single functions and inside the functions i do a single if check per thing i want to check. Taking a break now, next up is block rotation. EDIT: found a bug i must fix before adding rotation: see top. Now i take a break.

* **14:29** - Starting to fix the minor bug mentioned above.

* **14:39** - Bug fixed. Moved order in gameLoop so that sidways move always happens before move down. Blocks behave as they are supposed to now. Could also remove diagonal collision checks inside collideLeft/Right functions.
* **14:41** - starting on block rotation.
* **15:20** - tar paus

* **16:22** - Forgot to logg when i started working again, but i figured out the rotations, just loop and move the blocks around. Did the first T-block rotation and it works. Im not checking if the cells are empty tho. Thats next, but now its naptime.

## 2024-05-11

Started a github account and added this project.

Game works. Blocks are spawned, blocks stop at the bottom. Game over happens if a frozen block exists in the top 3 rows.

Added side movment and quickdrop. Movment is not registered if keypress happens to fast (less than framTime). But its good enough now so i save that one for the end.

Cant get frame updates to work properly and input and animation looks and feels bad.
Made a new branch because i realised timing is fundamentally messed up. I need to redo al lthe timing logic with "requestAnimationFrame()" instead.

Pushed the branch changes to main since time works. Game logic needs to be fixed now.

## 2024-05-09

First attempt turned into incomprehensibility since everything happend in a single nested loop over the gameBoard array.

Rewrote everything and put every event in its own function to be called in order from the main game loop.

Also changed the gameBoard array so that it now is larger. This way it can include a bottom, edges and a spawn area.

## 2024-05-08

Wasted an hour doing the wrong things since i didnt remember what i was working on yesterday.

Starting a dev journal to fix this.

Removed the gameBoard buffer used to keep track of the next frame. Instead i loop "backwards", and update the gameBoard directly.
