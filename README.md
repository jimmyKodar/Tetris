# About

Project to learn JavaScript, CSS and HTML.

# Key bindings

- Arrow up = rotate
- Arrow down = quick drop
- Arrow left/right = side movement

# Demo video

https://github.com/jimmyKodar/Tetris/assets/169525180/8c60b2bf-bd76-4c0c-8a97-8117b9bd9654

# How it works

The game is rendered by a grid of 24 rows and 12 columns filled with `<div>` tags.
The divs are 10x10 pixels in size and change color based on how the `gameBoard[][]` array is set.

I call these divs "blocks". The actual tetris shapes are called "tetronimos" and these are made up of blocks.

The `gameBoard[][]` has its origo at top left (index: `[0][0]`). The `gameBoard[][]` has the following properties:

- "0" = empty.
- "-1" = edge or frozen blocks.
- "1" = live blocks that are in motion.
- Play area is 20x10 since:
  - Top 3 rows are the spawn area.
  - First and last column and the bottom row are the edges.

# Known issues / bugs

- _(game logic, time)_ game can not go faster than screen Hz because of `requestAnimationFrame()`.
- _(game logic, time)_ Game does not update while in the background. Also because of how `requestAnimationFrame()` works.
