var transform = null
;(function () {
  var styles = [
    'webkitTransform',
    'MozTransform',
    'msTransform',
    'OTransform',
    'transform'
  ];

  var el = document.createElement('p');

  for (var i = 0; i < styles.length; i++) {
    if (null != el.style[styles[i]]) {
      transform = styles[i];
      break;
    }
  }
})()

/**
 * Transition-end mapping
 */
var transitionEnd = null
;(function () {
  var map = {
    'WebkitTransition' : 'webkitTransitionEnd',
    'MozTransition' : 'transitionend',
    'OTransition' : 'oTransitionEnd',
    'msTransition' : 'MSTransitionEnd',
    'transition' : 'transitionend'
  };

  /**
  * Expose `transitionend`
  */

  var el = document.createElement('p');

  for (var transition in map) {
    if (null != el.style[transition]) {
      transitionEnd = map[transition];
      break;
    }
  }
})()

exports.transitionend = transitionEnd

exports.transition = require('transition-property')

exports.transform = transform

exports.touchAction = require('touchaction-property')

exports.has3d = require('has-translate3d')
