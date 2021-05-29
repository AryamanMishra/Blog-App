/*global describe, it*/
var assert = require('assert')
var detect = require('..')

describe('prop-detect', function() {
  it('should be transition', function () {
    assert(/transition/i.test(detect.transition))
  })

  it('should be transform', function () {
    assert(/transform/i.test(detect.transform))
  })

  it('should be touchAction', function () {
    if (detect.touchAction) {
      assert.equal('touchAction', detect.touchAction)
    } else {
      assert.equal(null, detect.touchAction)
    }
  })

  it('should be transitionend', function () {
    assert(/transition/i.test(detect.transitionend))
  })

  it('should be has3d', function () {
    assert.equal(detect.has3d, true)
  })


})
