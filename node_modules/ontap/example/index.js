var ontap = require('..')
var el = document.getElementById('demo')
ontap(el, function (e) {
  console.log(e.target)
})
