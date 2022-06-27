console.log('[Teste] Flappy Bird!');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

// [Backgroud]
const backGround = {
  spriteX: 390,
  spriteY:0,
  largura:275,
  altura:204,
  PositionX:0,
  PositionY: canvas.height - 204,
  
  draw() {
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(  
      sprites,
      backGround.spriteX, backGround.spriteY, // Sprite x, Sprite Y
      backGround.largura, backGround.altura, //Tamanho da Sprite
      backGround.PositionX, backGround.PositionY,
      backGround.largura, backGround.altura
      );

    contexto.drawImage(  
      sprites,
      backGround.spriteX, backGround.spriteY, // Sprite x, Sprite Y
      backGround.largura, backGround.altura, //Tamanho da Sprite
      (backGround.PositionX + backGround.largura), backGround.PositionY,
      backGround.largura, backGround.altura
      );
  }
}

// [Floor]
const floor = {
  spriteX: 0,
  spriteY:610,
  largura:224,
  altura:112,
  PositionX:0,
  PositionY:canvas.height - 112,
  
  draw() {
    contexto.drawImage(  
      sprites,
      floor.spriteX, floor.spriteY, // Sprite x, Sprite Y
      floor.largura, floor.altura, //Tamanho da Sprite
      floor.PositionX, floor.PositionY,
      floor.largura, floor.altura
      );

      contexto.drawImage(  
        sprites,
        floor.spriteX, floor.spriteY, // Sprite x, Sprite Y
        floor.largura, floor.altura, //Tamanho da Sprite
        (floor.PositionX + floor.largura), floor.PositionY,
        floor.largura, floor.altura
        );
  }
  }

// [Flappi Bird]
const flappyBird = {
spriteX: 0,
spriteY:0,
largura:33,
altura:24,
PositionX:10,
PositionY:50,
gravidade:0.25,
velocidade: 0,


update() {
  flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
  flappyBird.PositionY = flappyBird.PositionY + flappyBird.velocidade;
},

draw() {
  contexto.drawImage(  
    sprites,
    flappyBird.spriteX, flappyBird.spriteY, // Sprite x, Sprite Y
    flappyBird.largura, flappyBird.altura, //Tamanho da Sprite
    flappyBird.PositionX, flappyBird.PositionY,
    flappyBird.largura, flappyBird.altura
    )
}

}

function loop() {
  backGround.draw();
  floor.draw();
  flappyBird.draw();
  flappyBird.update();

  requestAnimationFrame(loop);  
}


loop();