var hasTouch = require('has-touch')
var tap = require('tap-event')
var event = require('event')

function now() {
  return (new Date()).getTime()
}
var ms = now()

module.exports = function (el, handler, forceTouch) {
  if (hasTouch || forceTouch) {
    event.bind(el, 'click', function (e) {
      e.preventDefault()
      if (now() - ms > 300) {
        handler.call(this, e)
      }
    })
    event.bind(el, 'touchstart', tap(function (e) {
      ms = now()
      handler.call(this, e)
    }))
  } else {
    event.bind(el, 'click', function (e) {
      e.preventDefault()
      handler.call(this, e)
    })
  }
}
