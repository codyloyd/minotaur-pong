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

/***/ "./node_modules/@codyloyd/tiny-game/src/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@codyloyd/tiny-game/src/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Game {\n  constructor({width, height, scale, parent}) {\n    this.width = width\n    this.height = height\n    this.parent = document.getElementById(parent)\n\n    this.canvas = document.createElement('canvas')\n    this.canvas.width = this.width * scale \n    this.canvas.height = this.height * scale \n\n    this.context = this.canvas.getContext('2d')\n    this.context.scale(scale, scale)\n\n    this.parent.appendChild(this.canvas)\n\n    this.oldTimeStamp = 0\n    this.running = false\n  }\n\n  update() {\n    throw(new Error('must implement `update` function'))\n  }\n\n  draw() {\n    throw(new Error('must implement `draw` function'))\n  }\n\n  start() {\n    window.requestAnimationFrame(this.gameLoop.bind(this))\n    this.running = true\n  }\n\n  stop() {\n    this.running = false\n  }\n\n  gameLoop(timeStamp) {\n    // calculate deltaTime\n    const deltaTime = (timeStamp - this.oldTimeStamp)\n    this.oldTimeStamp = timeStamp\n\n    this.update(deltaTime/1000)\n    this.draw()\n\n    if (this.running) {\n      window.requestAnimationFrame(this.gameLoop.bind(this))\n    }\n  }\n}\n\nmodule.exports = {\n  Game\n}\n\n//# sourceURL=webpack:///./node_modules/@codyloyd/tiny-game/src/index.js?");

/***/ }),

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! exports provided: createBall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createBall\", function() { return createBall; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nconst createBall = function(x,y, radius, dx,dy) {\n  const checkPaddleCollision = function(paddle) {\n    if (\n      this.x < paddle.x + paddle.w &&\n      this.x + this.radius > paddle.x &&\n      this.y < paddle.y + paddle.h &&\n      this.y + this.radius > paddle.y \n    ) {\n      return true\n    }\n    return false\n  }\n\n  const update = function(dt, paddle) {\n    const prevX = this.x\n    const prevY = this.y\n\n    this.x += (this.dx * dt)\n    this.y += (this.dy * dt)\n\n    if(this.x > _index__WEBPACK_IMPORTED_MODULE_0__[\"game\"].width-this.radius || this.x < this.radius) {\n      this.x == prevX\n      this.dx *= -1\n    }\n    if(this.checkPaddleCollision(paddle)||this.y > (_index__WEBPACK_IMPORTED_MODULE_0__[\"game\"].height-this.radius) || this.y < this.radius) {\n      this.y = prevY\n      this.dy *= -1\n    }\n\n  }\n\n  const draw = function() {\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"game\"].context.beginPath()\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"game\"].context.arc(this.x,this.y,this.radius,0,Math.PI*2)\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"game\"].context.fillStyle = '#44a'\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"game\"].context.fill()\n  }\n\n  return {\n    x, y, dx, dy, update, draw, radius, checkPaddleCollision\n  }\n}\n\n\n\n//# sourceURL=webpack:///./src/ball.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"game\", function() { return game; });\n/* harmony import */ var _codyloyd_tiny_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @codyloyd/tiny-game */ \"./node_modules/@codyloyd/tiny-game/src/index.js\");\n/* harmony import */ var _codyloyd_tiny_game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_codyloyd_tiny_game__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ \"./src/ball.js\");\n/* harmony import */ var _paddle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paddle */ \"./src/paddle.js\");\n\n\n\n\nconst game = new _codyloyd_tiny_game__WEBPACK_IMPORTED_MODULE_0__[\"Game\"]({\n  scale: 4,\n  width: 128,\n  height: 128,\n  parent: 'game'\n})\n\nlet ball = Object(_ball__WEBPACK_IMPORTED_MODULE_1__[\"createBall\"])(game.width/2,game.height/2,4,90,60)\nlet paddle = Object(_paddle__WEBPACK_IMPORTED_MODULE_2__[\"createPaddle\"])(game.width/2, game.height-8,32)\n\nwindow.onkeydown = function({key}) {\n  paddle.onkeydown(key)\n\n  if(key=='Escape') {\n    game.stop()\n  }\n}\n\nwindow.onkeyup = function({key}) {\n  paddle.onkeyup(key)\n}\n\ngame.draw = function() {\n  game.context.clearRect(0,0,game.width,game.height)\n  ball.draw()\n  paddle.draw()\n}\n\ngame.update = function(dt) {\n  ball.update(dt, paddle)\n  paddle.update(dt)\n}\n\ngame.start()\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/paddle.js":
/*!***********************!*\
  !*** ./src/paddle.js ***!
  \***********************/
/*! exports provided: createPaddle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createPaddle\", function() { return createPaddle; });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nconst createPaddle = function(x,y,w,h=4) {\n  let dx = 0 \n  let rightIsDown = false\n  let leftIsDown = false\n\n  const onkeydown = function(key) {\n    if(key=='ArrowRight') {\n      rightIsDown = true\n    } else if(key=='ArrowLeft') {\n      leftIsDown = true\n    }\n  }\n\n  const onkeyup = function(key) {\n    if(key=='ArrowRight') {\n      rightIsDown = false\n    } else if(key=='ArrowLeft') {\n      leftIsDown = false\n    }\n  }\n\n  const update  = function(dt) {\n    const prevX = this.x\n\n    const dir = Math.sign(this.dx)\n    const lowerDx = Math.max(0, (Math.abs(this.dx) - (200 * dt))) * dir\n    this.dx = lowerDx\n    if (leftIsDown) {\n      this.dx = -80\n    }\n    if (rightIsDown) {\n      this.dx = 80\n    }\n    if(leftIsDown && rightIsDown) {\n      this.dx = lowerDx\n    }\n\n    this.x += (this.dx * dt)\n\n    if(this.x > _index__WEBPACK_IMPORTED_MODULE_0__[\"game\"].width-this.w || this.x < 0) {\n      this.dx = 0\n      this.x = prevX\n    }\n  }\n\n  const draw = function() {\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"game\"].context.fillStyle = \"#a44\"\n    _index__WEBPACK_IMPORTED_MODULE_0__[\"game\"].context.fillRect(this.x,this.y,this.w,this.h)\n  }\n\n  return{dx,x,y,w,h,update,draw, onkeydown, onkeyup}\n}\n\n\n\n\n//# sourceURL=webpack:///./src/paddle.js?");

/***/ })

/******/ });