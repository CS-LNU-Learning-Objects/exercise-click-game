var ClickGame = require('./ClickGame')

// In this exercise you have the HTML and are bound to it so just dig stuff out.
// Mayby the html just should have been one container and we created all the elements
// and append it to that stuff instead - Se Johans memory movie for that example

var boardElement = document.getElementById('board')
var squares = document.querySelectorAll('#board div')
var colorToClickElement = document.getElementById('colorToClick')
var timerElement = document.getElementById('time')

var cg = new ClickGame(boardElement, squares, colorToClickElement, timerElement)
cg.runGame()

// This code is using the module solution where the game and the timer is in
// the modules directory
/*
 var cg = require("./modules/clickGameModule");
 var boardElement = document.querySelector("#board");
 var timerElement = document.querySelector("#time");
 var colorToClickElement = document.querySelector("#colorToClick");
 cg.playClickGame(boardElement, timerElement, colorToClickElement);
 */

// I was playing around and created two games
/*
var boardElement = document.getElementById("board2");
var squares = document.querySelectorAll("#board2 div");
var colorToClickElement = document.getElementById("colorToClick2")
var timerElement = document.getElementById("time2");
var cg2 = new ClickGame(boardElement, squares, colorToClickElement, timerElement);
cg2.runGame();
*/
