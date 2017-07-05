/**
 * This solution uses Constructor/prototype as an alternative to the
 * memory demo that uses a more simple module pattern.
 */

// Using a extern library for shuffle-method. You find it: https://lodash.com/
// if you want this install the module with "npm install lodash"
// Otherwise just use a common shuffle algo.
var _ = require('lodash')

// The timer is in an own module
var Timer = require('./Timer')

// Need to save ref to the bindMethod
var bindMethod

// use variables instead of text strings - Uppcase tells it is a constant (should not be changed)
// if changes in code will be done it will only change in one place
var GREY = 'grey'
var RED = 'red'
var BLUE = 'blue'
var YELLOW = 'yellow'
var CLICK_EVENT = 'click'
var MAX_HITS = 3

/**
 * Constructor for ClickGame
 * @param {Element} boardElement - Element holding the div including squares
 * @param {Element} squareElements - All the square games
 * @param {Element} colorToClickElement - Element where the color to click presents
 * @param {Element} timerElement - The timer element where the tiem should be updated
 * @constructor
 */
function ClickGame (boardElement, squareElements, colorToClickElement, timerElement) {
  this.hitsMade = 0
  this.boardElement = boardElement
  this.squares = squareElements
  this.colorToClickElement = colorToClickElement
  this.timer = new Timer(timerElement)
}

/**
 * Called when a new game should run. Do the whole game. Could be split to minor pieces if you want.
 */
ClickGame.prototype.runGame = function () {
  var colorToClick
  this.hitsMade = 0

    // set colors to the squared
  setUpSquares(this.squares)

    // get a color to click
  colorToClick = setUpRandomClickColor(this.colorToClickElement)

    // the eventhandler
  var handleClick = function (event) {
    if (event.target.classList.contains(GREY)) {
      return false
    }

        // did we click the right color? Use the classList property to
        // find out and to change stuff
    if (event.target.classList.contains(colorToClick)) {
      event.target.classList.remove(colorToClick)
      event.target.classList.add(GREY)
      this.hitsMade += 1

            // is all down?
      if (this.hitsMade === MAX_HITS) {
        this.stopGame()
      }
    } else {
      console.log('Miss')
    }
  }

    // since we using bind we gets a new function to hold on to
    // this could be clutter in a prototype method
  bindMethod = handleClick.bind(this)
  this.boardElement.addEventListener(CLICK_EVENT, bindMethod)

    // all events are set so start the timer and the game will run
  this.timer.start()
}

/**
 * Just stop the game, no clean up or restart in this exercise
 */
ClickGame.prototype.stopGame = function () {
  this.boardElement.removeEventListener(CLICK_EVENT, bindMethod)
  this.timer.stop()
}

/**
 * Put random color to the squares
 * @param {Array<Element>} squareElements
 */
function setUpSquares (squareElements) {
    // Get an randomize array with diffrent colors
  var arr = getRandomColors()

    // put the color in each of the squares
    // this solution will need that all squares have the class grey from the start
    // that should be reconsidered if you want som kind of restart function
  var i
  for (i = 0; i < squareElements.length; i += 1) {
    squareElements[i].classList.remove(GREY)
    squareElements[i].classList.add(arr[i])
  }
}

/**
 * Get a random "click-color"
 * @param {Element} element - Element to update
 * @returns {String} - The name of the color to click
 */
function setUpRandomClickColor (element) {
    // random a color to click down
  var toClick = getColor(1 + Math.floor(Math.random() * 3))
  element.textContent = toClick
  return toClick
}

/**
 * Pure function that just shuffle a array around. Using lodash shuffle function
 * @returns {Array}
 */
function getRandomColors () {
    // start with an order one the shuffle
    // could have just put the color in the array for simplicity
  var arr = [RED, RED, RED, BLUE, BLUE, BLUE, YELLOW, YELLOW, YELLOW]
  return _.shuffle(arr)
}

module.exports = ClickGame
