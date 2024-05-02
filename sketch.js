let xBola = 300;
let yBola = 200;
let diametro = 18;
let raio = diametro / 2;

let velXBola = 7;
let velYBola = 7;
let velAumentada = 0.2;
let velBola = 7;

let xRaquete = 7;
let yRaquete = 150;
let compRaquete = 8;
let altRaquete = 95;
let velRaquete = 10;
let velRaqueteOriginal = 9;

let xRaqueteOp = 585;
let yRaqueteOp = 150;
let velRaqueteOp;
let velRaqueteOpMp = 9;

let colisao = false;
let chanceDeErrar = 0;

let meusPontos = 0;
let opPontos = 0;

let ponto;
let raquetada;
let trilha;

let resultado = 5;

function preload() {
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  linha();
  bola();
  movBola();
  colBola();
  raquete(xRaquete, yRaquete);
  raquete(xRaqueteOp, yRaqueteOp);
  movRaquete();
  //movRaqueteOp();
  multiplayer();
  colRaqueteBorda();
  colRaqueteBordaOp();
  colRaqueteBola(xRaquete, yRaquete);
  colRaqueteBola(xRaqueteOp, yRaqueteOp);
  placar();
  marcarPonto();
  bolaNaoFicaPresa();
}

function linha() {
  stroke(255, 50);
  strokeWeight(4);
  line(300, 0, 300, 400);
}

function bola() {
  circle(xBola, yBola, diametro);
}

function movBola() {
  xBola += velXBola;
  yBola += velYBola;
}

function colBola() {
  if (xBola + raio > width || xBola - raio < 0) {
    velXBola *= -1;
  }

  if (yBola + raio > height || yBola - raio < 0) {
    velYBola *= -1;
  }
}

function raquete(x, y) {
  rect(x, y, compRaquete, altRaquete);
}

function movRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= velRaquete;
  }

  if (keyIsDown(83)) {
    yRaquete += velRaquete;
  }
}

function movRaqueteOp() {
  velRaqueteOp = yBola - yRaqueteOp - compRaquete / 2 - 30;
  yRaqueteOp += velRaqueteOp + chanceDeErrar;
  calculoChanceErro();

  if (meusPontos >= resultado) {
    xBola = 300;
    yBola = 200;
    velXBola = 0;
    velYBola = 0;
    velRaquete = 0;
    velRaqueteOp = 0;
    fill(255);
    stroke(255);
    strokeWeight(2);
    textAlign(CENTER);
    text("Voce ganhou!!", 300, 130);
    trilha.stop();
  }
  if (opPontos >= resultado) {
    xBola = 300;
    yBola = 200;
    velXBola = 0;
    velYBola = 0;
    velRaquete = 0;
    velRaqueteOp = 0;
    fill(255);
    stroke(255);
    strokeWeight(2);
    textAlign(CENTER);
    text("Voce perdeu!!", 300, 130);
    trilha.stop();
  }
}

function colRaqueteBorda() {
  if (yRaquete < 0) {
    yRaquete = 0;
    velRaquete = 0;
  } else if (yRaquete + altRaquete > height) {
    yRaquete = height - altRaquete;
    velRaquete = 0;
  } else {
    velRaquete = velRaqueteOriginal;
  }
}

function colRaqueteBola(x, y) {
  colisao = collideRectCircle(
    x,
    y,
    compRaquete,
    altRaquete,
    xBola,
    yBola,
    raio
  );
  if (colisao) {
    velXBola *= -1;
    raquetada.play();
  }
}

function placar() {
  fill(255);
  stroke(255);
  strokeWeight(2);
  textSize(40);
  text(meusPontos, 250, 40);
  text(opPontos, 330, 40);
}

function marcarPonto() {
  if (xBola > 590) {
    meusPontos += 1;
    ponto.play();
    velAumentada++;
    atualizarVelBola();
  }

  if (xBola < 10) {
    opPontos += 1;
    ponto.play();
    velAumentada++;
    atualizarVelBola();
  }
}

function atualizarVelBola() {
  if (xBola + raio > width) {
    velXBola = -1 * (velBola + velAumentada);
  } else if (xBola < 0) {
    velXBola = 1 * (velBola + velAumentada);
  }
  if (yBola + raio > height) {
    velYBola = -1 * (velBola + velAumentada);
  } else if (yBola < 0) {
    velYBola = 1 * (velBola + velAumentada);
  }
}

function multiplayer() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOp -= velRaqueteOpMp;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOp += velRaqueteOpMp;
  }

  if (meusPontos >= resultado) {
    xBola = 300;
    yBola = 200;
    velXBola = 0;
    velYBola = 0;
    velRaquete = 0;
    velRaqueteOp = 0;
    fill(255);
    stroke(255);
    strokeWeight(2);
    textAlign(CENTER);
    text("Jogador 1 Ganhou!!", 300, 130);
    trilha.stop();
  }
  if (opPontos >= resultado) {
    xBola = 300;
    yBola = 200;
    velXBola = 0;
    velYBola = 0;
    velRaquete = 0;
    velRaqueteOp = 0;
    fill(255);
    stroke(255);
    strokeWeight(2);
    textAlign(CENTER);
    text("Jogador 2 Ganhou!!", 300, 130);
    trilha.stop();
  }
}

function colRaqueteBordaOp() {
  if (yRaqueteOp < 0) {
    yRaqueteOp = 0;
    velRaqueteOpMp = 0;
  } else if (yRaqueteOp + altRaquete > height) {
    yRaqueteOp = height - altRaquete;
    velRaqueteOpMp = 0;
  } else {
    velRaqueteOpMp = 9;
  }
}

function calculoChanceErro() {
  if (opPontos >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}

function bolaNaoFicaPresa() {
  if (xBola - raio < 0) {
    xBola = 23;
  }
}
