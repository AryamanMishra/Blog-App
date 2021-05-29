var styles = [
  'webkitTransition',
  'MozTransition',
  'OTransition',
  'msTransition',
  'transition'
]

var el = document.createElement('p')
var style

for (var i = 0; i < styles.length; i++) {
  if (null != el.style[styles[i]]) {
    style = styles[i]
    break
  }
}
el = null

module.exports = style
