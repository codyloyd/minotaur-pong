import {game} from './index'

const createPaddle = function(x,y,w,h=4) {
  let dx = 0 
  let rightIsDown = false
  let leftIsDown = false

  const onkeydown = function(key) {
    if(key=='ArrowRight') {
      rightIsDown = true
    } else if(key=='ArrowLeft') {
      leftIsDown = true
    }
  }

  const onkeyup = function(key) {
    if(key=='ArrowRight') {
      rightIsDown = false
    } else if(key=='ArrowLeft') {
      leftIsDown = false
    }
  }

  const update  = function(dt) {
    const prevX = this.x

    const dir = Math.sign(this.dx)
    const lowerDx = Math.max(0, (Math.abs(this.dx) - (200 * dt))) * dir
    this.dx = lowerDx
    if (leftIsDown) {
      this.dx = -80
    }
    if (rightIsDown) {
      this.dx = 80
    }
    if(leftIsDown && rightIsDown) {
      this.dx = lowerDx
    }

    this.x += (this.dx * dt)

    if(this.x > game.width-this.w || this.x < 0) {
      this.dx = 0
      this.x = prevX
    }
  }

  const draw = function() {
    game.context.fillStyle = "#a44"
    game.context.fillRect(this.x,this.y,this.w,this.h)
  }

  return{dx,x,y,w,h,update,draw, onkeydown, onkeyup}
}

export {createPaddle}
