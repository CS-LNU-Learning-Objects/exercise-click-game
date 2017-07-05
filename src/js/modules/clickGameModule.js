'use strict'
var timer = require('./timerModule')
var MAX_HITS = 3
var CLICK_EVENT = 'click'

/**
 * Produce the array
 * @returns {Array}
 */
function getClassesArray () {
  var i
  var result = []
  var colors = ['red', 'blue', 'yellow']

  for (i = 0; i < 3; i += 1) {
    result = result.concat(colors)
  }

  return result
}

/**
 * Get a random item from an array
 * @param array
 * @returns {*|Array.<T>}
 */
function getRandomItem (array) {
  var id = Math.floor(Math.random() * array.length)
  return array.splice(id, 1)
}

/**
 * Creates the game
 * @param boardElement
 * @param timeElement
 * @param colorToClickElement
 */
function create (boardElement, timeElement, colorToClickElement) {
  var hits = 0
  var i

    // get a color/class to click
  var clickColor = getRandomItem(getClassesArray())
  colorToClickElement.textContent = colorToClickElement.textContent + clickColor

    // get the squares
  var squares = boardElement.children
  var length = squares.length

    // get an array with classes
  var colorArray = getClassesArray()

    // update the squares with css classes
  for (i = 0; i < length; i += 1) {
    var color = getRandomItem(colorArray)
    squares[i].classList.add(color)
  }

    // Eventhandler
  var clickEvent = function clickEvent (event) {
    var target = event.target

        // is it a corrent hit?
    if (target.classList.contains(clickColor)) {
            // put it back to grey
      event.target.classList.remove(clickColor)
      hits += 1

      if (MAX_HITS === hits) {
                // game over
        boardElement.removeEventListener(CLICK_EVENT, clickEvent)
        timer.stop()
      }
    } else {
      console.log('MISS!')
    }
  }

  boardElement.addEventListener(CLICK_EVENT, clickEvent)

    // Set an interval to act as a timer for how quick the game is played.
  timer.start(function (time) {
    timeElement.textContent = time
  })
}

module.exports = {
  playClickGame: create
}
