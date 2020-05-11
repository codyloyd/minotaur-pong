import {Game} from '@codyloyd/tiny-game'
import {createBall} from './ball'
import {createPaddle} from './paddle'

const game = new Game({
  scale: 4,
  width: 128,
  height: 128,
  parent: 'game'
})

let ball = createBall(game.width/2,game.height/2,4,90,60)
let paddle = createPaddle(game.width/2, game.height-8,32)

window.onkeydown = function({key}) {
  paddle.onkeydown(key)

  if(key=='Escape') {
    game.stop()
  }
}

window.onkeyup = function({key}) {
  paddle.onkeyup(key)
}

game.draw = function() {
  game.context.clearRect(0,0,game.width,game.height)
  ball.draw()
  paddle.draw()
}

game.update = function(dt) {
  ball.update(dt, paddle)
  paddle.update(dt)
}

game.start()

export {game}