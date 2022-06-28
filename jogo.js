console.log('[Teste] Flappy Bird!')

let frames = 0

const fall_sound = new Audio()
fall_sound.src = './effects/fall.wav'

const score_sound = new Audio()
score_sound.src = './effects/score.wav'

const jump_sound = new Audio()
jump_sound.src = './effects/jump.wav'

const hit_sound = new Audio()
hit_sound.src = './effects/hit.wav'

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

// [Background]
const backGround = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  PositionX: 0,
  PositionY: canvas.height - 204,

  draw() {
    context.fillStyle = '#70c5ce'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.drawImage(
      sprites,
      backGround.spriteX,
      backGround.spriteY, // Sprite x, Sprite Y
      backGround.width,
      backGround.height, //Tamanho da Sprite
      backGround.PositionX,
      backGround.PositionY,
      backGround.width,
      backGround.height
    )

    context.drawImage(
      sprites,
      backGround.spriteX,
      backGround.spriteY, // Sprite x, Sprite Y
      backGround.width,
      backGround.height, //Tamanho da Sprite
      backGround.PositionX + backGround.width,
      backGround.PositionY,
      backGround.width,
      backGround.height
    )
  }
}

// [Floor]
function createFloor() {
  const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    PositionX: 0,
    PositionY: canvas.height - 112,

    update() {
      const moveFloor = 1
      const repetFloor = floor.width / 2
      const move = floor.PositionX - moveFloor
      floor.PositionX = move % repetFloor
    },

    draw() {
      context.drawImage(
        sprites,
        floor.spriteX,
        floor.spriteY, // Sprite x, Sprite Y
        floor.width,
        floor.height, //Tamanho da Sprite
        floor.PositionX,
        floor.PositionY,
        floor.width,
        floor.height
      )

      context.drawImage(
        sprites,
        floor.spriteX,
        floor.spriteY, // Sprite x, Sprite Y
        floor.width,
        floor.height, //Tamanho da Sprite
        floor.PositionX + floor.width,
        floor.PositionY,
        floor.width,
        floor.height
      )
    }
  }
  return floor
}

function collision() {
  const flappyBirdY = global.flappyBird.PositionY + global.flappyBird.height
  const floorY = global.floor.PositionY

  if (flappyBirdY >= floorY) {
    return true
  }

  return false
}

// [Flappy Bird]
function createFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    PositionX: 10,
    PositionY: 50,
    gravity: 0.25,
    velocity: 0,
    jump: 4.6,

    toJump() {
      flappyBird.velocity = - flappyBird.jump
      jump_sound.play()
    },

    update() {
      if (collision(flappyBird, global.floor)) {
        hit_sound.play()
          switchToScreen(screens.gameOver)

        return
      }
      flappyBird.velocity = flappyBird.velocity + flappyBird.gravity
      flappyBird.PositionY = flappyBird.PositionY + flappyBird.velocity
      if(flappyBird.velocity > 8) {
          fall_sound.play()
      }
    },

    move: [
      { spriteX: 0, spriteY: 0 }, //asa para top
      { spriteX: 0, spriteY: 26 }, //asa no mid
      { spriteX: 0, spriteY: 52 }, //asa para bot
      { spriteX: 0, spriteY: 26 } //asa no mid
    ],

    currentFrame: 0,

    updateToFrame() {
      const frameRange = 10
      const passedTheBreak = frames % frameRange === 0

      if (passedTheBreak) {
        const incrementBase = 1
        const increment = incrementBase + flappyBird.currentFrame
        const basisOfRepetition = flappyBird.move.length
        flappyBird.currentFrame = increment % basisOfRepetition
      }
    },

    draw() {
      flappyBird.updateToFrame()
      const { spriteX, spriteY } = flappyBird.move[flappyBird.currentFrame]
      context.drawImage(
        sprites,
        spriteX,
        spriteY, // Sprite x, Sprite Y
        flappyBird.width,
        flappyBird.height, //Tamanho da Sprite
        flappyBird.PositionX,
        flappyBird.PositionY,
        flappyBird.width,
        flappyBird.height
      )
    }
  }
  return flappyBird
}

const messageGetReady = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 152,
  PositionX: canvas.width / 2 - 174 / 2,
  PositionY: 50,

  draw() {
    context.drawImage(
      sprites,
      messageGetReady.spriteX,
      messageGetReady.spriteY, // Sprite x, Sprite Y
      messageGetReady.width,
      messageGetReady.height, //Tamanho da Sprite
      messageGetReady.PositionX,
      messageGetReady.PositionY,
      messageGetReady.width,
      messageGetReady.height
    )
  }
}

const messageGameOver = {
  spriteX: 134,
  spriteY: 153,
  width: 226,
  height: 200,
  PositionX: canvas.width / 2 - 226 / 2,
  PositionY: 50,

  draw() {
    context.drawImage(
      sprites,
      messageGameOver.spriteX,
      messageGameOver.spriteY, // Sprite x, Sprite Y
      messageGameOver.width,
      messageGameOver.height, //Tamanho da Sprite
      messageGameOver.PositionX,
      messageGameOver.PositionY,
      messageGameOver.width,
      messageGameOver.height
    )
  }
}


function createScore(){
  const score = {
    pointing: 0,
    draw() {
      context.font = '35px "VT323"';
      context.textAlign = 'right'
      context.fillStyle = 'white'
      context.fillText(`${score.pointing}`, canvas.width - 10, 35)
      score.pointing
    },
  }
  return score;
}

// [Pipes]
function createPipes() {
  const pipes = {
    width: 52,
    height: 400,
    floor: {
      spriteX: 0,
      spriteY: 169
    },
    sky: {
      spriteX: 52,
      spriteY: 169
    },
    space: 80,

    draw() {
      pipes.pairs.forEach(function (even) {
        const yRandomPipes = even.y
        const gapPipes = 90
        // Sky pipes
        const pipeSkyX = even.x
        const pipeSkyY = yRandomPipes
        context.drawImage(
          sprites,
          pipes.sky.spriteX,
          pipes.sky.spriteY, // Sprite x, Sprite Y
          pipes.width,
          pipes.height, //Tamanho da Sprite
          pipeSkyX,
          pipeSkyY,
          pipes.width,
          pipes.height
        )
        // Floor pipes
        const pipeFloorX = even.x
        const pipeFloorY = pipes.height + gapPipes + yRandomPipes
        context.drawImage(
          sprites,
          pipes.floor.spriteX,
          pipes.floor.spriteY, // Sprite x, Sprite Y
          pipes.width,
          pipes.height, //Tamanho da Sprite
          pipeFloorX,
          pipeFloorY,
          pipes.width,
          pipes.height
        )

        even.pipeSky = {
          x: pipeSkyX,
          y: pipes.height + pipeSkyY
        }

        even.pipeFloor = {
          x: pipeFloorX,
          y: pipeFloorY
        }
      })
    },

    collisionWithTheFlappyBird(even) {
      const headOfFlappyBird = global.flappyBird.PositionY
      const footOfFlappyBird =
        global.flappyBird.PositionY + global.flappyBird.height
      if ((global.flappyBird.PositionX + global.flappyBird.height) >= even.x) {
        if (headOfFlappyBird <= even.pipeSky.y) {
          return true
        }
        if (footOfFlappyBird >= even.pipeFloor.y) {
          return true
        }

        return false
      }
    },

    pairs: [],
    update() {
      const passedHundredFrame = frames % 100 === 0
      if (passedHundredFrame) {
        pipes.pairs.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1)
        })
      }
      pipes.pairs.forEach(function (even) {
        even.x = even.x - 2
        if (pipes.collisionWithTheFlappyBird(even)) {
          hit_sound.play()
          switchToScreen(screens.gameOver)
        }

        if (even.x + pipes.width <= 0) {
          pipes.pairs.shift()
          score_sound.play()
          global.score.pointing = global.score.pointing + 1;
        }
      })
    }
  }
  return pipes
}

// [Screens]
const global = {}
let screensActive = {}
function switchToScreen(newScreen) {
  screensActive = newScreen

  if (screensActive.initialize) {
    screensActive.initialize()
  }
}

const screens = {
  start: {
    initialize() {
      global.flappyBird = createFlappyBird()
      global.floor = createFloor()
      global.pipes = createPipes()
    },

    draw() {
      backGround.draw()
      global.flappyBird.draw()
      global.floor.draw()
      messageGetReady.draw()
    },

    click() {
      switchToScreen(screens.game)
    },

    update() {
      global.floor.update()
    }
  }
}

screens.game = {
  initialize(){
    global.score = createScore();
  },

  draw() {
    backGround.draw()
    global.pipes.draw()
    global.floor.draw()
    global.flappyBird.draw()
    global.score.draw()
  },

  click() {
    global.flappyBird.toJump()
  },

  update() {
    global.pipes.update()
    global.floor.update()
    global.flappyBird.update()

  }
}

screens.gameOver = {
  draw() {
    messageGameOver.draw();
 
  },
  update() {

  },
  click() {
    switchToScreen(screens.start)
  },
}

function loop() {
  screensActive.draw()
  screensActive.update()

  frames = frames + 1
  requestAnimationFrame(loop)
}

window.addEventListener('click', function () {
  if (screensActive) {
    screensActive.click()
  }
})

switchToScreen(screens.start)
loop()
