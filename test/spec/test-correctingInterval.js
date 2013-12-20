describe('setCorrectingInterval', function() {
  var noop = function() { };

  it('should be defined', function() {
    expect(setCorrectingInterval).to.be.ok;
  });

  it('should return a unique id', function() {
  	var iter = 5,
      defined = {};

    for (var i = 0; i < iter; i++) {
      var intervalId = setCorrectingInterval(noop, 1000);
      defined[intervalId] = true;
      clearCorrectingInterval(intervalId);
    }

    expect(Object.keys(defined).length).to.equal(iter);
  });

  it('should execute callback after defined delay', function(done) {
    var delay = 500,
      now = Date.now(),
      intervalId;

    intervalId = setCorrectingInterval(function() {
      expect(Math.abs(Date.now() - now - delay)).to.be.within(0, 25);
      clearCorrectingInterval(intervalId);
      done();
    }, delay);
  });

  it('should continuously execute callback after defined delay', function(done) {
    var delay = 100,
      iter = 0,
      intervalId;

    intervalId = setCorrectingInterval(function() {
      if (++iter === 2) {
        clearCorrectingInterval(intervalId);
        done();
      }
    }, delay);
  });

  it('should be relatively accurate', function(done) {
    var delay = target = 200,
      previousDelay = undefined,
      now = Date.now();

    setCorrectingInterval(function() {
      // Expect at least one interval to be more accurate than its
      //  previous before timeout occurs

      var thisDelay = Date.now() - now - target;
      if (previousDelay !== 'undefined' && thisDelay < previousDelay) done();
      previousDelay = thisDelay;
      target += delay;
    }, delay)
  });

  it('should gracefully handle bad delay parameter input', function() {
    var intervalId;
    intervalId = setCorrectingInterval(noop);
    clearCorrectingInterval(intervalId);
    intervalId = setCorrectingInterval(noop, '');
    clearCorrectingInterval(intervalId);
    intervalId = setCorrectingInterval(noop, -100);
    clearCorrectingInterval(intervalId);
  });

  it('should gracefully handle bad function parameter input', function() {
    var intervalId = setCorrectingInterval(undefined, 100);

    setTimeout(function() {
      clearCorrectingInterval(intervalId);
    }, 200);
  });
});

describe('clearCorrectingInterval', function() {
  it('should be defined', function() {
    expect(clearCorrectingInterval).to.be.ok;
  });

  it('should clear a running interval', function(done) {
    var iter = 0,
      intervalId;

    intervalId = setCorrectingInterval(function() {
      if (++iter === 2) throw new Error('expected to clear interval');
      clearCorrectingInterval(intervalId);
    }, 50);

    setTimeout(function() {
      done();
    }, 200);
  });

  it('should gracefully handle bad input', function() {
    clearCorrectingInterval(null);
    clearCorrectingInterval(0);
    clearCorrectingInterval('');
  });
});
