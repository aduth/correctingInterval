(function() {
    var autoIncrement = 0,
        intervals = {};

    window.setCorrectingInterval = function (func, delay, minDelay /* optional */) {
        var id = autoIncrement++,
            planned = Date.now() + delay;

        minDelay = minDelay || 0;

        function tick () {
            func();
            if (intervals[id]) {
                planned += delay;
                intervals[id] = setTimeout(tick, Math.max(planned - Date.now(), minDelay));
            }
        }

        intervals[id] = setTimeout(tick, delay);
        return id;
    };

    window.clearCorrectingInterval = function (id) {
        clearTimeout(intervals[id]);
        delete intervals[id];
    };
})();