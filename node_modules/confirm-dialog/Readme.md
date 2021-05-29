# Confirm-dialog

A confirm dialog works on both desktop and mobile phone.

[demo](https://chemzqm.github.io/confirm-dialog)

## Install

    npm install confirm-dialog


## Usage

``` js
var confirm = require('confirm-dailog')
confirm('Are you sure?').then(function() {
  // yes
}, function() {
  // no
})
```

_Style css class `confirm-footer` for custom style_

## API

### Confirm(msg, [opt])

* `msg` could be string or element node.
* `opt.style` contains style override default style
* `opt.yes` yes text for dialog
* `opt.no` no text for dialog

## LICENSE

  Copyright 2016 chemzqm@gmail.com

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the "Software"),
  to deal in the Software without restriction, including without limitation
  the rights to use, copy, modify, merge, publish, distribute, sublicense,
  and/or sell copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
