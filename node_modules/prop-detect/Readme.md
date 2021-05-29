# prop-detect

[![Build Status](https://secure.travis-ci.org/chemzqm/prop-detect.svg)](http://travis-ci.org/chemzqm/prop-detect)

  Detect animation properties, it's annoying to install each of them.
  :smiley:

## Install

    npm i prop-detect -S

## Usage

``` js
var detect = require('prop-detect')
var transform = detect.transform
var transition = detect.transition
var touchAction = detect.touchAction
var transitionend = detect.transitionend
var has3d = detect.has3d // true or false
```

## API

* `transform` style name
* `transition` style name
* `touchAction` style name
* `transitionend` event name
* `has3d` true of false
