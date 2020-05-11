import {game} from './index'

const createBall = function(x,y, radius, dx,dy) {
  const checkPaddleCollision = function(paddle) {
    if (
      this.x < paddle.x + paddle.w &&
      this.x + this.radius > paddle.x &&
      this.y < paddle.y + paddle.h &&
      this.y + this.radius > paddle.y 
    ) {
      return true
    }
    return false
  }

  const update = function(dt, paddle) {
    const prevX = this.x
    const prevY = this.y

    this.x += (this.dx * dt)
    this.y += (this.dy * dt)

    if(this.x > game.width-this.radius || this.x < this.radius) {
      this.x == prevX
      this.dx *= -1
    }
    if(this.checkPaddleCollision(paddle)||this.y > (game.height-this.radius) || this.y < this.radius) {
      this.y = prevY
      this.dy *= -1
    }

  }

  const draw = function() {
    game.context.beginPath()
    game.context.arc(this.x,this.y,this.radius,0,Math.PI*2)
    game.context.fillStyle = '#44a'
    game.context.fill()
  }

  return {
    x, y, dx, dy, update, draw, radius, checkPaddleCollision
  }
}

export {createBall}