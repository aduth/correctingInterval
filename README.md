[![Build Status](https://travis-ci.org/aduth/correctingInterval.png?branch=master)](https://travis-ci.org/aduth/correctingInterval)

# correctingInterval

correctingInterval exposes two functions, `setCorrectingInterval` and `clearCorrectingInterval`, which serve as drop-in replacements for `setInterval` and `clearInterval`. Unlike `setInterval`, the `setCorrectingInterval` function automatically adjusts to correct subsequent intervals that were delayed due to latency. This is useful if your delayed executions need to occur at predictable intervals. For more information, refer to my related blog post below:

[Creating a self-correcting alternative to JavaScript's setInterval](http://www.andrewduthie.com/post/a-self-correcting-setinterval-alternative/)

## Usage

### Browser

Download correctingInterval.js to your project or install using Bower (`bower install correctingInterval`). Include the file using a `<script>` tag. Then, use with the same syntax as you would use `setInterval`, e.g.:

```javascript
var startTime = Date.now();
setCorrectingInterval(function() {
  console.log((Date.now() - startTime) + 'ms elapsed');
}, 1000);
```

### RequireJS

Download correctingInterval.js to your project or install using Bower (`bower install correctingInterval`). Include the file as a dependency to your module. correctingInterval is passed as an object containing the two functions as object members, e.g.:

```javascript
define([
  'vendor/correctingInterval'
], function(ci) {
  var startTime = Date.now();
  ci.setCorrectingInterval(function() {
    console.log((Date.now() - startTime) + 'ms elapsed');
  }, 1000);
});
```

### Node.js

Install correctingInterval using npm (`npm install correcting-interval`). Require correctingInterval in your application script. correctingInterval is passed as an object containing the two functions as object members, e.g.:

```javascript
var ci = require('correcting-interval');

var startTime = Date.now();
ci.setCorrectingInterval(function() {
  console.log((Date.now() - startTime) + 'ms elapsed');
}, 1000);
```

## Clearing Intervals

Similar to `setInterval`, you can stop running intervals by storing a reference to the value returned by `setCorrectingInterval` and later use as the sole parameter to `clearCorrectingInterval`, e.g.:

```javascript
var intervalId = setCorrectingInterval(function() { }, 1000);

// Later in your script...
clearCorrectingInterval(intervalId);
```

## License

Copyright 2014 Andrew Duthie.

Released freely under the MIT license (refer to LICENSE.txt).
