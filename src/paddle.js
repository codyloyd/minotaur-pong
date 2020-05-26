class Paddle {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.vy = 0
  }
  update(dt, isDown, height) {
    this.vy = 0
    if (isDown.ArrowDown) {
      this.vy = 180
    }
    if (isDown.ArrowUp) {
      this.vy = -180
    }

    if (this.y < 0) {
      this.vy = 0
      this.y = 0
    }
    if(this.y > height - this.h) {
      this.vy = 0
      this.y = height - this.h 
    }

    this.y += this.vy * dt
  }
  draw(context) {
    context.fillStyle = "#eae2b7"
    context.fillRect(this.x, this.y, this.w, this.h)
  }
}

export {Paddle}
