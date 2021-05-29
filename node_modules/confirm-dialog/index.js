var event = require('event')
var ontap = require('ontap')
var classes = require('classes')
var domify = require('domify')
var detect = require('prop-detect')
var template = require('./footer.html')
var transform = detect.transform
var transition = detect.transition
var transitionEnd = detect.transitionend
var root = document.compatMode=='BackCompat'? document.body : document.documentElement

function Confirm(msg, opt) {
  opt = opt || {}
  var body = document.body
  var overlay = document.createElement('div')
  classes(overlay).add('confirm-overlay')
  var rect = document.documentElement.getBoundingClientRect()
  var w = root.clientWidth
  var h = root.clientHeight
  assign(overlay.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: w + 'px',
    height: Math.max(rect.height, h) + 'px',
    zIndex: 998,
    backgroundColor: 'rgba(0,0,0,0)'
  })
  body.appendChild(overlay)
  var top = h/2 - 50
  var left = w/2 - 100
  var el = document.createElement('div')
  assign(el.style, {
    position: 'fixed',
    top: top + 'px',
    padding: '10px',
    zIndex: 999,
    border: '1px solid #000',
    textAlign: 'center',
    width: '200px',
    left: left + 'px',
    opacity: 0,
    backgroundColor: '#fff'
  })
  el.style[transform] = 'scale(0.6)'
  overlay.style[transition] = 'all 500ms linear'
  el.style[transition] = 'all 250ms cubic-bezier(0.04, 0.76, 0.41, 0.99)'
  setTimeout(function () {
    el.style[transform] = 'scale(1)'
    el.style.opacity = '1'
    overlay.style.backgroundColor = 'rgba(0,0,0,0.4)'
  }, 20)
  if (opt.style) {
    assign(el.style, opt.style)
  }
  classes(el).add('confirm-active')
  if (typeof msg === 'string') {
    el.innerHTML = '<div>' + msg + '</div>'
  } else if (msg.nodeType === 1){
    el.appendChild(msg)
  } else {
    throw new Error('typeof [' + msg + '] not recognized')
  }
  body.appendChild(el)
  template = template.replace(/\{\w+\}/g, function (word) {
    if (word == '{yes}') {
      return opt.yes || 'Yes'
    } else if (word == '{no}') {
      return opt.no || 'No'
    }
  })
  var footer = domify(template)
  el.appendChild(footer)
  if (opt.alert) {
    var btn = footer.querySelector('.no')
    btn.parentNode.removeChild(btn)
  }

  function cleanUp() {
    event.bind(el, transitionEnd, function end() {
      event.unbind(el, transitionEnd, end)
      if (el.parentNode) body.removeChild(el)
    })
    el.style.opacity = 0
    el.style[transform] = 'translateY(-100%)'
    body.removeChild(overlay)
  }

  return new Promise(function (resolve, reject) {
    ontap(footer,function (e) {
      var clz = classes(e.target)
      if (clz.has('yes')) {
        cleanUp()
        resolve()
      } else if (clz.has('no')) {
        cleanUp()
        reject()
      }
    })
  })
}


function assign(to, from) {
  Object.keys(from).forEach(function (k) {
    to[k] = from[k]
  })
  return to
}

module.exports = Confirm
