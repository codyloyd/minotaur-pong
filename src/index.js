// src/index.js
import {Game} from '@codyloyd/tiny-game'
import {Paddle} from './paddle'

const game = new Game({
  width: 400,
  height: 400,
  parent: 'game'
})

const ball = {
  x: 200,
  y: 200,
  vx: 100,
  vy: 160,
  radius: 15
}

const score = {
  player1: 0,
  player2: 0
}

let gameState = 'start'

function isBallColliding(paddle) {
  if (ball.x - ball.radius < paddle.x + paddle.w &&
    ball.x + ball.radius > paddle.x &&
    ball.y - ball.radius < paddle.y + paddle.h &&
    ball.y + ball.radius > paddle.y) {
    return true
  }
}
const leftPaddle = new Paddle(10,10,10,100)
const rightPaddle = new Paddle(game.width-20,10,10,100)

const isDown = {
  ArrowUp: false,
  ArrowDown: false
}
function handleKeydown(event) {
  const key = event.key
  // ADD THIS
  if (gameState === "start") {
    score.player1 = 0
    score.player2 = 0
    gameState = "play"
  }
  // AND THIS
  if (gameState === "end") {
    gameState = "start"
  }

  if (key == 'ArrowUp') {
    isDown.ArrowUp = true
  }
  if (key == 'ArrowDown') {
    isDown.ArrowDown = true
  }
}
function handleKeyup(event) {
  const key = event.key
  if (key == 'ArrowUp') {
    isDown.ArrowUp = false
  }
  if (key == 'ArrowDown') {
    isDown.ArrowDown = false
  }
}
document.addEventListener('keydown', handleKeydown)
document.addEventListener('keyup', handleKeyup)

game.update = function(dt) {
  if(gameState === "start" || gameState === "end") {
    return
  }
  // update ball position
  ball.x += ball.vx * dt
  ball.y += ball.vy * dt

  if (ball.y > game.width - ball.radius || ball.y < ball.radius) {
    ball.vy *= -1
  }
  if (ball.x > game.width - ball.radius) {
    score.player2 += 1
    ball.x = 200
    ball.y = 200
    ball.vx *= -1
  }
  if (ball.x < ball.radius) {
    score.player1 += 1
    ball.x = 200
    ball.y = 200
    ball.vx *= -1
  }

  leftPaddle.update(dt, isDown, game.height)
  rightPaddle.update(dt, isDown, game.height)

  if (isBallColliding(leftPaddle) || isBallColliding(rightPaddle)) {
    ball.vx *= -1
  }

  if (score.player1 == 5 || score.player2 == 5) {
    gameState = "end"
  }
}

game.draw = function() {
  if (gameState === 'start') {
    game.context.fillStyle = "#001029"
    game.context.fillRect(0,0,game.width, game.height)
    game.context.fillStyle = "#eae2b7"
    game.context.font = "48px serif"
    let textWidth = game.context.measureText('PONG').width
    game.context.fillText("PONG", game.width/2 - textWidth/2, 100)

    game.context.font = "28px serif"
    const subtitle = 'press any key'
    textWidth = game.context.measureText(subtitle).width
    game.context.fillText(subtitle, game.width/2 - textWidth/2, 300)

    // return is important here.. don't want to draw anything else
    // if we're in the 'start' state
    return
  }

  if (gameState === 'end') {
    game.context.fillStyle = "#001029"
    game.context.fillRect(0,0,game.width, game.height)
    game.context.fillStyle = "#eae2b7"
    game.context.font = "48px serif"
    let textWidth = game.context.measureText('GAME OVER').width
    game.context.fillText("GAME OVER", game.width/2 - textWidth/2, 100)

    game.context.font = "28px serif"
    const subtitle = 'press any key'
    textWidth = game.context.measureText(subtitle).width
    game.context.fillText(subtitle, game.width/2 - textWidth/2, 300)

    // return is important here.. don't want to draw anything else
    // if we're in the 'end' state
    return
  }
  // this fillRect covers the entire screen and is the 'background' for our game
  game.context.fillStyle = "#003049"
  game.context.fillRect(0,0,game.width, game.height)
  leftPaddle.draw(game.context)
  rightPaddle.draw(game.context)

  const scoreText = `${score.player1} | ${score.player2}`
  const textWidth = game.context.measureText(scoreText).width
  game.context.fillStyle = "#eae2b7"
  game.context.font = "48px serif"
  game.context.fillText(scoreText,(game.width/2)-(textWidth/2),50,game.width)

  // this is the code for drawing a circle for our ball.
  game.context.fillStyle = "#fcbf49"
  game.context.beginPath()
  game.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  game.context.fill()
}

game.start()