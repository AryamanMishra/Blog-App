/*global describe, it, beforeEach, afterEach*/
var assert = require('assert')
var ontap = require('..')
var Touch = require('touch-simulate')

function fire (element, event) {
  var e = new UIEvent(event, {
      bubbles: true,
      cancelable: false,
      detail: 1
  })
  element.dispatchEvent(e)
}

var el
beforeEach(function () {
  el = document.createElement('div')
  document.body.appendChild(el)
})

afterEach(function () {
  document.body.removeChild(el)
})

describe('works', function() {
  it('should works on desktop', function () {
    var fired
    ontap(el, function () {
      fired = true
    })
    fire(el, 'click')
    assert.equal(fired, true)
  })

  it('should works on touch device', function () {
    var fired
    var count = 0
    global.ontouchstart = function () {}
    ontap(el, function () {
      fired = true
      count++
    }, true)
    var touch = new Touch(el)
    return touch.tap().then(function () {
      assert.equal(fired, true)
    })
  })
})
