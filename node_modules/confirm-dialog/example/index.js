var confirm = require('..')

confirm('This action can not be undone!').then(function () {
  console.log('yes')
}, function () {
  console.log('no')
}).then(function () {
  return confirm('Are you sure?', {
    alert: true
  })
}).catch(function () {
  
})
