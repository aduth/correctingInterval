/*! correcting-interval 1.0.3 | Copyright 2013 Andrew Duthie | MIT License */
;(function(global, factory) {
  // Use UMD pattern to expose exported functions
  if (typeof exports === 'object') {
    // Expose to Node.js
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // Expose to RequireJS
    define([], factory);
  }

  // Expose to global object (likely browser window)
  var exports = factory();
  for (var prop in exports) {
    global[prop] = exports[prop];
  }
}(this, function() {
  // Track running intervals
  var correctingIntervals = [];

  // Polyfill Date.now
  var now = Date.now ? Date.now() : Date.valueOf();

  var setCorrectingInterval = function() {
    // Create closure to save instance settings
    var instance = { };

    // Save to global running intervals
    instance.guid = correctingIntervals.length;
    correctingIntervals.push(instance);

    var tick = function(func, delay) {
      if (!instance.started) {
        // On first call, save instance settings
        instance.func = func instanceof Function ? func : (function() { });
        instance.delay = delay;
        instance.startTime = now;
        instance.target = delay;
        instance.started = true;
        instance.intervalId = setTimeout.apply(this, [ tick ].concat([].slice.call(arguments, 1)));
        return instance.guid;
      } else {
        // On subsequent iterations, adjust timeout to correct for latency
        var elapsed = now - instance.startTime,
          adjust = instance.target - elapsed,
          args = [].slice.call(arguments),
          timeoutArgs = [ tick, instance.delay + adjust ].concat(args);

        instance.func.apply(this, args);
        if (correctingIntervals[instance.guid]) {
          // Only re-register if clearCorrectingInterval was not called during function
          instance.target += instance.delay;
          instance.intervalId = setTimeout.apply(this, timeoutArgs);
        }
      }
    };

    return tick.apply(this, [].slice.call(arguments));
  };

  var clearCorrectingInterval = function(intervalId) {
    if (!correctingIntervals[intervalId]) return;

    // Clear existing timeout and remove from global running intervals
    clearTimeout(correctingIntervals[intervalId].intervalId);
    correctingIntervals[intervalId] = null;
  };

  return {
    setCorrectingInterval: setCorrectingInterval,
    clearCorrectingInterval: clearCorrectingInterval
  };
}));
