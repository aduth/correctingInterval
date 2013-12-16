# correctingInterval

_correctingInterval_ exposes two functions, `setCorrectingInterval` and `clearCorrectingInterval`, which serve as drop-in replacements for `setInterval` and `clearInterval`. The _correctingInterval_ approach automatically corrects subsequent intervals that were delayed due to latency. For more information, refer to my related blog post below:

[A self-correcting alternative to JavaScript's setInterval for when you need to stay in sync](http://www.andrewduthie.com/post/setCorrectingInterval/)

# Usage

Include _correctingInterval.js_ through a browser `<script>` tag, using RequireJS, or in Node.js. Then, use `setCorrectingInterval` and `clearCorrectingInterval` just as you would use `setInterval` and `clearInterval`.

```javascript
var startTime = Date.now();
setCorrectingInterval(function() {
  console.log((Date.now() - startTime) + 'ms elapsed');
}, 1000);
```

`setCorrectingInterval` returns a unique identifier that you can later use as the parameter to `clearCorrectingInterval`.

# License

Copyright 2013 Andrew Duthie.

Released freely under the MIT license (refer to LICENSE.txt).