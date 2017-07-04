/**
 * Just a simple timer
 * public API
 */
module.exports = {
  start: start,
  stop: stop
}

var clearIntervalID

/**
 * The timer takes a callback for updating the time
 * @param {function} callback
 */
function start (callback) {
  var start = new Date().getTime()
  var time = 0
  var elapsed = '0.0'

  function instance () {
    time += 100
    elapsed = Math.floor(time / 100) / 10
    if (Math.round(elapsed) == elapsed) {
      elapsed += '.0'
    }
    callback(elapsed)
    var diff = (new Date().getTime() - start) - time
    window.clearInterval(this.intervalID)
    clearIntervalID = window.setTimeout(instance.bind(this), (100 - diff))
  }
  clearIntervalID = window.setTimeout(instance.bind(this), 100)
};

/**
 * Stops the timer
 */
function stop () {
  window.clearInterval(clearIntervalID)
};
