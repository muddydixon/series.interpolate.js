var d3, expect, interpolate, testDataNum;

if (typeof require !== 'undefined') {
  interpolate = require('../src/interpolate');
  expect = require('chai').expect;
  d3 = require('d3');
} else {
  mocha.setup('bdd');
  expect = chai.expect;
}

testDataNum = 20;

describe('Interpolate', function() {
  describe('interpolate simple number array', function() {
    it('with no opt', function() {
      var correct, _i, _results;
      correct = (function() {
        _results = [];
        for (var _i = 0; 0 <= testDataNum ? _i <= testDataNum : _i >= testDataNum; 0 <= testDataNum ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(d) {
        return d;
      });
      return expect(interpolate([0, 1, 3, 5, 6, testDataNum])[0]).to.deep.equal(correct);
    });
    it('with stepwise', function() {
      var correct, _i, _ref, _results;
      correct = (function() {
        _results = [];
        for (var _i = 0, _ref = testDataNum * 2; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(d) {
        return d / 2;
      });
      return expect(interpolate([0, 0.5, 3, 5.5, 6, testDataNum], {
        step: 0.5
      })[0]).to.deep.equal(correct);
    });
    it('with no opt 3 step', function() {
      var correct;
      correct = d3.range(0, 30, 3);
      return expect(interpolate([0, 3, 9, 27])[0]).to.deep.equal(correct);
    });
    return it('with no opt 3 step complamenting const value', function() {
      var correct;
      correct = [0, 3, 10, 9, 10, 10, 10, 10, 10, 27];
      return expect(interpolate([0, 3, 9, 27], {
        defaults: 10
      })[0]).to.be.eql(correct);
    });
  });
  describe('interpolate object array', function() {
    it('with no opt', function() {
      var correct, _i, _results;
      correct = (function() {
        _results = [];
        for (var _i = 0; 0 <= testDataNum ? _i <= testDataNum : _i >= testDataNum; 0 <= testDataNum ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(d) {
        return {
          x: d
        };
      });
      return expect(interpolate([
        {
          x: 0
        }, {
          x: 1
        }, {
          x: testDataNum
        }
      ])[0]).to.deep.equal(correct);
    });
    it('with no opt 4 step', function() {
      var correct;
      correct = d3.range(0, 30, 4).map(function(d) {
        return {
          x: d
        };
      });
      return expect(interpolate([0, 4, 16, 28].map(function(d) {
        return {
          x: d
        };
      }))[0]).to.deep.equal(correct);
    });
    return it('with no opt 3 step complamenting const value', function() {
      var correct;
      correct = [0, 3, 10, 9, 10, 10, 10, 10, 10, 27].map(function(d, idx) {
        return {
          x: idx * 3,
          v: d * d
        };
      });
      return expect(interpolate([0, 3, 9, 27].map(function(d) {
        return {
          x: d,
          v: d * d
        };
      }), {
        defaults: {
          v: 100
        }
      })[0]).to.be.eql(correct);
    });
  });
  describe('interpolate Date array', function() {
    it('with no opt', function() {
      var correct, _i, _results;
      correct = (function() {
        _results = [];
        for (var _i = 0; 0 <= testDataNum ? _i <= testDataNum : _i >= testDataNum; 0 <= testDataNum ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(d) {
        return new Date(2013, 0, d);
      });
      return expect(interpolate([0, 3, 5, testDataNum].map(function(d) {
        return new Date(2013, 0, d);
      }))[0]).to.deep.equal(correct);
    });
    return it('with no opt and object containing Date', function() {
      var correct, _i, _results;
      correct = (function() {
        _results = [];
        for (var _i = 0; 0 <= testDataNum ? _i <= testDataNum : _i >= testDataNum; 0 <= testDataNum ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(d) {
        return {
          x: new Date(2013, 0, d)
        };
      });
      return expect(interpolate([0, 3, 5, testDataNum].map(function(d) {
        return {
          x: new Date(2013, 0, d)
        };
      }))[0]).to.deep.equal(correct);
    });
  });
  return describe('interpolate pseude time series', function() {
    it('with no opt', function() {
      var correct, testData, _i, _results;
      correct = (function() {
        _results = [];
        for (var _i = 0; 0 <= testDataNum ? _i <= testDataNum : _i >= testDataNum; 0 <= testDataNum ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(d) {
        return {
          x: new Date(2013, 0, d),
          v: 100 - d
        };
      });
      testData = correct.slice(0, 1, correct.length - 2).concat(correct[correct.length - 1]).concat(d3.shuffle(correct.slice(1, correct.length - 1)).slice(0, 0 | testDataNum * 0.5)).sort(function(a, b) {
        return a.x - b.x;
      });
      return expect(interpolate(testData)[0]).to.deep.equal(correct);
    });
    return it('with default value', function() {
      var correct, testData, _i, _results;
      correct = (function() {
        _results = [];
        for (var _i = 0; 0 <= testDataNum ? _i <= testDataNum : _i >= testDataNum; 0 <= testDataNum ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(d) {
        return {
          x: new Date(2013, 0, d),
          v: 100 - d
        };
      });
      correct.filter(function(d, idx) {
        return !(idx === 0 || idx === 2 || idx === 3 || idx === testDataNum);
      }).forEach(function(d) {
        return d.v = 0;
      });
      testData = [0, 2, 3, testDataNum].map(function(d) {
        return {
          x: new Date(2013, 0, d),
          v: 100 - d
        };
      });
      return expect(interpolate(testData, {
        defaults: {
          v: 0
        }
      })[0]).to.deep.equal(correct);
    });
  });
});

if (typeof require === 'undefined') {
  mocha.run();
}
