console.log('[Teste] Flappy Bird!')

let frames = 0

const hit_sound = new Audio()
hit_sound.src = './effects/hit.wav'

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

// [Backgroud]
const backGround = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  PositionX: 0,
  PositionY: canvas.height - 204,

  draw() {
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
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

    contexto.drawImage(
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
      contexto.drawImage(
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

      contexto.drawImage(
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
      flappyBird.velocity = -flappyBird.jump
    },

    update() {
      if (collision(flappyBird, global.floor)) {
        console.log('faz colisao')
        hit_sound.play()
        setTimeout(() => {
          switchToScreen(screens.start)
        }, 500)
        return
      }

      flappyBird.velocity = flappyBird.velocity + flappyBird.gravity
      flappyBird.PositionY = flappyBird.PositionY + flappyBird.velocity
    },

    move: [
      { spriteX: 0, spriteY: 0 }, //asa para cima
      { spriteX: 0, spriteY: 26 }, //asa no meio
      { spriteX: 0, spriteY: 52 }, //asa para baixo
      { spriteX: 0, spriteY: 26 } //asa no meio
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
      contexto.drawImage(
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

const mensageGetReady = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 152,
  PositionX: canvas.width / 2 - 174 / 2,
  PositionY: 50,

  draw() {
    contexto.drawImage(
      sprites,
      mensageGetReady.spriteX,
      mensageGetReady.spriteY, // Sprite x, Sprite Y
      mensageGetReady.width,
      mensageGetReady.height, //Tamanho da Sprite
      mensageGetReady.PositionX,
      mensageGetReady.PositionY,
      mensageGetReady.width,
      mensageGetReady.height
    )

    contexto.drawImage(
      sprites,
      global.floor.spriteX,
      global.floor.spriteY, // Sprite x, Sprite Y
      global.floor.width,
      global.floor.height, //Tamanho da Sprite
      global.floor.PositionX + global.floor.width,
      global.floor.PositionY,
      global.floor.width,
      global.floor.height
    )
  }
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
        contexto.drawImage(
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
        contexto.drawImage(
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
      if (global.flappyBird.PositionX >= even.x) {
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
          switchToScreen(screens.start)
        }

        if (even.x + pipes.width <= 0) {
          pipes.pairs.shift()
        }
      })
    }
  }
  return pipes
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
      mensageGetReady.draw()
    },

    click() {
      switchToScreen(screens.jogo)
    },

    update() {
      global.floor.update()
    }
  }
}

screens.jogo = {
  draw() {
    backGround.draw()
    global.pipes.draw()
    global.floor.draw()
    global.flappyBird.draw()
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
