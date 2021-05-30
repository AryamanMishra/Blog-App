var hasTouch = require('has-touch')
var event = require('event')
var tap = require('tap-event')

function now() {
  return (new Date()).getTime()
}
var ms = now()

module.exports = function (el, handler) {
  if (hasTouch) {
    return BindTouch(el, handler)
  } else {
    return BindDesktop(el, handler)
  }
}

function BindTouch(el, handler) {
  var clickHandler = function (e) {
    if (now() - ms > 300) {
      handler.call(this, e)
    }
  }
  var tapHandler = tap(function (e) {
    ms = now()
    handler.call(this, e)
  })
  event.bind(el, 'click', clickHandler)
  event.bind(el, 'touchstart', tapHandler)
  return {
    unbind: function () {
      event.unbind(el, 'click', clickHandler)
      event.unbind(el, 'touchstart', tapHandler)
    }
  }
}

function BindDesktop(el, handler) {
  var clickHandler = function (e) {
    handler.call(this, e)
  }
  event.bind(el, 'click', clickHandler)
  return {
    unbind: function () {
      event.unbind(el, 'click', clickHandler)
    }
  }
}

