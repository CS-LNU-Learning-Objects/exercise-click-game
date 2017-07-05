/**
 * Just a simple timer type
 * @constructor
 */
function Timer (elementToUpdate) {
  this.element = elementToUpdate || document.body
}

/**
 * This method is correcting the error problem that setTimeout have
 * http://www.sitepoint.com/creating-accurate-timers-in-javascript/
 *
 * @param {Element} elementToUpdate - The element to update visual
 */
Timer.prototype.start = function () {
  var start = new Date().getTime()
  var time = 0
  var elapsed = '0.0'

  function instance () {
    time += 100
    elapsed = Math.floor(time / 100) / 10
    if (Math.round(elapsed) === elapsed) {
      elapsed += '.0'
    }
    this.element.textContent = elapsed
    var diff = (new Date().getTime() - start) - time
    window.clearInterval(this.intervalID)
    this.intervalID = window.setTimeout(instance.bind(this), (100 - diff))
  }
  this.intervalID = window.setTimeout(instance.bind(this), 100)
}

Timer.prototype.stop = function () {
  window.clearInterval(this.intervalID)
}

module.exports = Timer
