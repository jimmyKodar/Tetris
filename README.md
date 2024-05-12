# About

I make this Tetris clone to learn JavaScript, CSS and HTML.

My goal is to keep rendering and game logic separate.

This way it is possible to implement the game in future projects. HTML5 canvas, webGPU / webGL etc.

# How it works

The game is rendered by a grid of 24 rows and 12 columns filled with `<div>` tags.
The divs are 10x10 pixels in size and change color based on how the `gameBoard[][]` array is set.

I call these divs "blocks". The actual tetris shapes are called "tetronimos" and these are made up of blocks.

The `gameBoard[][]` has its origo at top left (index: `[0][0]`). The `gameBoard[][]` has the following properties:

- "0" = empty.
- "-1" = edge or frozen blocks.
- "1" = live blocks that are in motion.
- Actual play area is 20x10 since:
  - Top 3 rows are the spawn area.
  - First and last column and the bottom row are the edges.

# Key bindings

- Arrow down = quick drop
- Arrow left/right = move to the side
- Space = start / pause

# Known issues / bugs

- _(game logic, time)_ game can not go faster than screen Hz because of `requestAnimationFrame()`.
- _(game logic, time)_ Game does not update while in the background. Also because of how `requestAnimationFrame()` works.
- _(Rendering)_ Background color shines through on some zoom levels.
