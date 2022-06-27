console.log('[Teste] Flappy Bird!');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

// [Backgroud]
const backGround = {
  spriteX: 390,
  spriteY:0,
  width:275,
  height:204,
  PositionX:0,
  PositionY: canvas.height - 204,
  
  draw() {
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(  
      sprites,
      backGround.spriteX, backGround.spriteY, // Sprite x, Sprite Y
      backGround.width, backGround.height, //Tamanho da Sprite
      backGround.PositionX, backGround.PositionY,
      backGround.width, backGround.height
      );

    contexto.drawImage(  
      sprites,
      backGround.spriteX, backGround.spriteY, // Sprite x, Sprite Y
      backGround.width, backGround.height, //Tamanho da Sprite
      (backGround.PositionX + backGround.width), backGround.PositionY,
      backGround.width, backGround.height
      );
  }
}

// [Floor]
const floor = {
  spriteX: 0,
  spriteY:610,
  width:224,
  height:112,
  PositionX:0,
  PositionY:canvas.height - 112,
  
  draw() {
    contexto.drawImage(  
      sprites,
      floor.spriteX, floor.spriteY, // Sprite x, Sprite Y
      floor.width, floor.height, //Tamanho da Sprite
      floor.PositionX, floor.PositionY,
      floor.width, floor.height
      );

      contexto.drawImage(  
        sprites,
        floor.spriteX, floor.spriteY, // Sprite x, Sprite Y
        floor.width, floor.height, //Tamanho da Sprite
        (floor.PositionX + floor.width), floor.PositionY,
        floor.width, floor.height
        );
  }
  }

// [Flappy Bird]
const flappyBird = {
spriteX: 0,
spriteY:0,
width:33,
height:24,
PositionX:10,
PositionY:50,
gravity:0.25,
velocity: 0,


update() {
  flappyBird.velocity = flappyBird.velocity + flappyBird.gravity
  flappyBird.PositionY = flappyBird.PositionY + flappyBird.velocity;
},

draw() {
  contexto.drawImage(  
    sprites,
    flappyBird.spriteX, flappyBird.spriteY, // Sprite x, Sprite Y
    flappyBird.width, flappyBird.height, //Tamanho da Sprite
    flappyBird.PositionX, flappyBird.PositionY,
    flappyBird.width, flappyBird.height
    )
}

}

const mensageGetReady = {
    spriteX: 134,
    spriteY:0,
    width:174,
    height:152,
    PositionX: (canvas.width / 2) - 174 / 2,
    PositionY:50,
    
    draw() {
      contexto.drawImage(  
        sprites,
        mensageGetReady.spriteX, mensageGetReady.spriteY, // Sprite x, Sprite Y
        mensageGetReady.width, mensageGetReady.height, //Tamanho da Sprite
        mensageGetReady.PositionX, mensageGetReady.PositionY,
        mensageGetReady.width, mensageGetReady.height
        );
  
        contexto.drawImage(  
          sprites,
          floor.spriteX, floor.spriteY, // Sprite x, Sprite Y
          floor.width, floor.height, //Tamanho da Sprite
          (floor.PositionX + floor.width), floor.PositionY,
          floor.width, floor.height
          );
    }
}


//
// [Screens]
//
let screensActive = {};
function switchToScreen(newScreen) {
  screensActive = newScreen
}

const screens = {
  start: {
    draw() {
      backGround.draw();
      floor.draw();
      flappyBird.draw();
      mensageGetReady.draw();
    },

    click(){
      switchToScreen(screens.jogo);
    },

    update() {

    }
  }
}

screens.jogo = {
  draw() {
    backGround.draw();
    floor.draw();
    flappyBird.draw();
  },
  update() {
    flappyBird.update();
  }
}

function loop() {
screensActive.draw()
screensActive.update()

  requestAnimationFrame(loop);  
}

window.addEventListener('click', function() {
  if(screensActive) {
    screensActive.click()
  }
})

switchToScreen(screens.start);
loop();