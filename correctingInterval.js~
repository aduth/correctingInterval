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
        if (exports.hasOwnProperty(prop)) {
            global[prop] = exports[prop];
        }
    }
}(this, function() {

    var autoIncrement = 0,
        intervals = {};

    return {
        setCorrectingInterval: function (func, delay, minDelay /* optional */) {
            var id = autoIncrement++,
                planned = Date.now() + delay;

            minDelay = minDelay || 0;

            function tick () {
                func();
                planned += delay;
                intervals[id] = setTimeout(tick, Math.max(planned - Date.now(), minDelay));
            }

            intervals[id] = setTimeout(tick, delay);
            return id;
        },

        clearCorrectingInterval: function (id) {
            clearTimeout(intervals[id]);
            delete intervals[id];
        }
    };
}));
