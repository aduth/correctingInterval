/*! correcting-interval 2.0.0 | Copyright 2014 Andrew Duthie | MIT License */
/* jshint evil: true */
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
  var numIntervals = 0,
    intervals = {},
    delays = {};

  // Polyfill Date.now
  var now = Date.now || function() {
    return new Date().valueOf();
  };

  var setCorrectingInterval = function(func, delay) {
    delays[id] = delay;
    var id = numIntervals++,
      planned = now() + delays[id];

    // Normalize func as function
    switch (typeof func) {
      case 'function':
        break;
      case 'string':
        var sFunc = func;
        func = function() {
          eval(sFunc);
        };
        break;
      default:
        func = function() { };
    }

    function tick() {
      func();

      // Only re-register if clearCorrectingInterval was not called during function
      if (intervals[id]) {
        planned += delays[id];
        intervals[id] = setTimeout(tick, planned - now());
      }
    }

    intervals[id] = setTimeout(tick, delays[id]);
    return id;
  };

  var changeCorrectingInterval = function(id,delay) {
    delays[id] = delay;
  };

  var clearCorrectingInterval = function(id) {
    clearTimeout(intervals[id]);
    delete intervals[id];
  };

  return {
    setCorrectingInterval: setCorrectingInterval,
    changeCorrectingInterval: changeCorrectingInterval,
    clearCorrectingInterval: clearCorrectingInterval
  };
}));
