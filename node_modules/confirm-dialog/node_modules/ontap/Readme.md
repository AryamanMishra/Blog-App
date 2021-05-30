# Ontap
Bind correct tap (https://github.com/chemzqm/tap-event) event to an element and click for desktop browser as well,
if tap not fired (eg: on the edge of mobile safari), handler would be called on
click.

## Install

    npm i ontap -S

## Usage

``` js
var ontap = require('ontap')
var el = document.getElementById('link')
ontap(el, function (e) {
  if (e.getAttribute('href') !== '#') {
    window.location.href = e.href
  }
})
```

## API

### ontap(el, handler)

* `el` is dom element.
* `handler` is callback function.
