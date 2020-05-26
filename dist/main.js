/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@codyloyd/tiny-game/src/Game.js":
/*!******************************************************!*\
  !*** ./node_modules/@codyloyd/tiny-game/src/Game.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Game {\n  constructor({width, height, scale=1, parent=\"game\", imageSmoothing=false}) {\n    this.width = width\n    this.height = height\n    this.parent = document.getElementById(parent)\n\n    this.canvas = document.createElement('canvas')\n    this.canvas.width = this.width * scale \n    this.canvas.height = this.height * scale \n\n    this.context = this.canvas.getContext('2d')\n    this.context.scale(scale, scale)\n    this.context.imageSmoothingEnabled = imageSmoothing;\n\n    this.parent.appendChild(this.canvas)\n\n    this.oldTimeStamp = 0\n    this.running = false\n  }\n\n  update() {\n    throw(new Error('must implement `update` function'))\n  }\n\n  draw() {\n    throw(new Error('must implement `draw` function'))\n  }\n\n  start() {\n    window.requestAnimationFrame(this.gameLoop.bind(this))\n    this.running = true\n  }\n\n  stop() {\n    this.running = false\n  }\n\n  gameLoop(timeStamp) {\n    // calculate deltaTime\n    const deltaTime = (timeStamp - this.oldTimeStamp)\n    this.oldTimeStamp = timeStamp\n\n    this.update(deltaTime/1000)\n    this.draw()\n\n    if (this.running) {\n      window.requestAnimationFrame(this.gameLoop.bind(this))\n    }\n  }\n}\n\nmodule.exports = {Game}\n\n//# sourceURL=webpack:///./node_modules/@codyloyd/tiny-game/src/Game.js?");

/***/ }),

/***/ "./node_modules/@codyloyd/tiny-game/src/SpriteSheet.js":
/*!*************************************************************!*\
  !*** ./node_modules/@codyloyd/tiny-game/src/SpriteSheet.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class SpriteSheet {\n  constructor({ path, context, colSize, rowSize, margin = 0 }) {\n    this.context = context;\n    this.colSize = colSize;\n    this.rowSize = rowSize;\n    this.margin = margin;\n    this.image = new Image();\n    this.image.src = path;\n    this.image.onload = () => {};\n  }\n\n  // grabs the image at a specific x/y/w/h in the sheet\n  createSprite(x, y, w, h) {\n    return new Sprite(this.context, this.image, x, y, w, h);\n  }\n\n  // gets a sprite in a specific column/row based on colSize/rowSize\n  getSprite(col, row) {\n    // TODO: make colSize/rowSize optional, throw error here.\n    return new Sprite(\n      this.context,\n      this.image,\n      this.colSize * col + this.margin * col,\n      this.rowSize * row + this.margin * row,\n      this.colSize,\n      this.rowSize\n    );\n  }\n}\n\nclass Sprite {\n  constructor(context, img, x, y, w, h) {\n    this.context = context;\n    this.img = img;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n  }\n\n  draw(x, y, w, h) {\n    this.context.drawImage(\n      this.img,\n      this.x,\n      this.y,\n      this.h,\n      this.w,\n      x,\n      y,\n      w,\n      h\n    );\n  }\n}\n\nmodule.exports = { SpriteSheet };\n\n//# sourceURL=webpack:///./node_modules/@codyloyd/tiny-game/src/SpriteSheet.js?");

/***/ }),

/***/ "./node_modules/@codyloyd/tiny-game/src/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@codyloyd/tiny-game/src/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {Game} = __webpack_require__(/*! ./Game */ \"./node_modules/@codyloyd/tiny-game/src/Game.js\")\nconst {SpriteSheet} = __webpack_require__(/*! ./SpriteSheet */ \"./node_modules/@codyloyd/tiny-game/src/SpriteSheet.js\")\n\nmodule.exports = {\n  Game,\n  SpriteSheet\n}\n\n//# sourceURL=webpack:///./node_modules/@codyloyd/tiny-game/src/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _codyloyd_tiny_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @codyloyd/tiny-game */ \"./node_modules/@codyloyd/tiny-game/src/index.js\");\n/* harmony import */ var _codyloyd_tiny_game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_codyloyd_tiny_game__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paddle */ \"./src/paddle.js\");\n// src/index.js\n\n\n\nconst game = new _codyloyd_tiny_game__WEBPACK_IMPORTED_MODULE_0__[\"Game\"]({\n  width: 400,\n  height: 400,\n  parent: 'game'\n})\n\nconst ball = {\n  x: 200,\n  y: 200,\n  vx: 100,\n  vy: 160,\n  radius: 15\n}\n\nconst score = {\n  player1: 0,\n  player2: 0\n}\n\nlet gameState = 'start'\n\nfunction isBallColliding(paddle) {\n  if (ball.x - ball.radius < paddle.x + paddle.w &&\n    ball.x + ball.radius > paddle.x &&\n    ball.y - ball.radius < paddle.y + paddle.h &&\n    ball.y + ball.radius > paddle.y) {\n    return true\n  }\n}\nconst leftPaddle = new _paddle__WEBPACK_IMPORTED_MODULE_1__[\"Paddle\"](10,10,10,100)\nconst rightPaddle = new _paddle__WEBPACK_IMPORTED_MODULE_1__[\"Paddle\"](game.width-20,10,10,100)\n\nconst isDown = {\n  ArrowUp: false,\n  ArrowDown: false\n}\nfunction handleKeydown(event) {\n  const key = event.key\n  // ADD THIS\n  if (gameState === \"start\") {\n    score.player1 = 0\n    score.player2 = 0\n    gameState = \"play\"\n  }\n  // AND THIS\n  if (gameState === \"end\") {\n    gameState = \"start\"\n  }\n\n  if (key == 'ArrowUp') {\n    isDown.ArrowUp = true\n  }\n  if (key == 'ArrowDown') {\n    isDown.ArrowDown = true\n  }\n}\nfunction handleKeyup(event) {\n  const key = event.key\n  if (key == 'ArrowUp') {\n    isDown.ArrowUp = false\n  }\n  if (key == 'ArrowDown') {\n    isDown.ArrowDown = false\n  }\n}\ndocument.addEventListener('keydown', handleKeydown)\ndocument.addEventListener('keyup', handleKeyup)\n\ngame.update = function(dt) {\n  if(gameState === \"start\" || gameState === \"end\") {\n    return\n  }\n  // update ball position\n  ball.x += ball.vx * dt\n  ball.y += ball.vy * dt\n\n  if (ball.y > game.width - ball.radius || ball.y < ball.radius) {\n    ball.vy *= -1\n  }\n  if (ball.x > game.width - ball.radius) {\n    score.player2 += 1\n    ball.x = 200\n    ball.y = 200\n    ball.vx *= -1\n  }\n  if (ball.x < ball.radius) {\n    score.player1 += 1\n    ball.x = 200\n    ball.y = 200\n    ball.vx *= -1\n  }\n\n  leftPaddle.update(dt, isDown, game.height)\n  rightPaddle.update(dt, isDown, game.height)\n\n  if (isBallColliding(leftPaddle) || isBallColliding(rightPaddle)) {\n    ball.vx *= -1\n  }\n\n  if (score.player1 == 5 || score.player2 == 5) {\n    gameState = \"end\"\n  }\n}\n\ngame.draw = function() {\n  if (gameState === 'start') {\n    game.context.fillStyle = \"#001029\"\n    game.context.fillRect(0,0,game.width, game.height)\n    game.context.fillStyle = \"#eae2b7\"\n    game.context.font = \"48px serif\"\n    let textWidth = game.context.measureText('PONG').width\n    game.context.fillText(\"PONG\", game.width/2 - textWidth/2, 100)\n\n    game.context.font = \"28px serif\"\n    const subtitle = 'press any key'\n    textWidth = game.context.measureText(subtitle).width\n    game.context.fillText(subtitle, game.width/2 - textWidth/2, 300)\n\n    // return is important here.. don't want to draw anything else\n    // if we're in the 'start' state\n    return\n  }\n\n  if (gameState === 'end') {\n    game.context.fillStyle = \"#001029\"\n    game.context.fillRect(0,0,game.width, game.height)\n    game.context.fillStyle = \"#eae2b7\"\n    game.context.font = \"48px serif\"\n    let textWidth = game.context.measureText('GAME OVER').width\n    game.context.fillText(\"GAME OVER\", game.width/2 - textWidth/2, 100)\n\n    game.context.font = \"28px serif\"\n    const subtitle = 'press any key'\n    textWidth = game.context.measureText(subtitle).width\n    game.context.fillText(subtitle, game.width/2 - textWidth/2, 300)\n\n    // return is important here.. don't want to draw anything else\n    // if we're in the 'end' state\n    return\n  }\n  // this fillRect covers the entire screen and is the 'background' for our game\n  game.context.fillStyle = \"#003049\"\n  game.context.fillRect(0,0,game.width, game.height)\n  leftPaddle.draw(game.context)\n  rightPaddle.draw(game.context)\n\n  const scoreText = `${score.player1} | ${score.player2}`\n  const textWidth = game.context.measureText(scoreText).width\n  game.context.fillStyle = \"#eae2b7\"\n  game.context.font = \"48px serif\"\n  game.context.fillText(scoreText,(game.width/2)-(textWidth/2),50,game.width)\n\n  // this is the code for drawing a circle for our ball.\n  game.context.fillStyle = \"#fcbf49\"\n  game.context.beginPath()\n  game.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)\n  game.context.fill()\n}\n\ngame.start()\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/paddle.js":
/*!***********************!*\
  !*** ./src/paddle.js ***!
  \***********************/
/*! exports provided: Paddle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Paddle\", function() { return Paddle; });\nclass Paddle {\n  constructor(x, y, w, h) {\n    this.x = x\n    this.y = y\n    this.w = w\n    this.h = h\n    this.vy = 0\n  }\n  update(dt, isDown, height) {\n    this.vy = 0\n    if (isDown.ArrowDown) {\n      this.vy = 180\n    }\n    if (isDown.ArrowUp) {\n      this.vy = -180\n    }\n\n    if (this.y < 0) {\n      this.vy = 0\n      this.y = 0\n    }\n    if(this.y > height - this.h) {\n      this.vy = 0\n      this.y = height - this.h \n    }\n\n    this.y += this.vy * dt\n  }\n  draw(context) {\n    context.fillStyle = \"#eae2b7\"\n    context.fillRect(this.x, this.y, this.w, this.h)\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/paddle.js?");

/***/ })

/******/ });