var copyObj, d3, estimeteStepwise, expect, getGCD, getTargetVal, interpolate;

d3 = require('d3');

interpolate = function(ts, opt) {
  var constructor, cur, defaults, idx, index, interpolateCnt, interpolatedList, ip, prev, step, _i, _ref, _results;
  opt = opt || {};
  index = opt.index || 'x';
  step = opt.step || estimeteStepwise(ts, index);
  defaults = opt.defaults;
  cur = getTargetVal(ts[0], index);
  constructor = ts[0][index] != null ? ts[0][index].constructor : ts[0].constructor;
  idx = 0;
  prev = getTargetVal(ts[idx], index);
  while (++idx < ts.length) {
    cur = getTargetVal(ts[idx], index);
    if (cur - prev !== step) {
      interpolateCnt = (cur - prev) / step;
      ip = d3.interpolate(ts[idx - 1], ts[idx]);
      interpolatedList = (function() {
        _results = [];
        for (var _i = 1, _ref = interpolateCnt - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(d) {
        var obj, _index;
        obj = ip(d / interpolateCnt);
        if (obj[index] != null) {
          _index = new constructor(obj[index]);
          if (defaults != null) {
            obj = copyObj(defaults);
          }
          obj[index] = _index;
        } else {
          if (defaults != null) {
            obj = copyObj(defaults);
          }
        }
        return copyObj(obj);
      });
      Array.prototype.splice.apply(ts, [idx, 0].concat(interpolatedList));
      idx += interpolatedList.length;
    }
    prev = cur;
  }
  return ts;
};

copyObj = function(src) {
  return JSON.parse(JSON.stringify(src));
};

estimeteStepwise = function(ts, index) {
  var cur, idx, prev, step, stepDist, steps, _i, _ref;
  stepDist = {};
  cur = getTargetVal(ts[0], index);
  for (idx = _i = 1, _ref = ts.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; idx = 1 <= _ref ? ++_i : --_i) {
    prev = cur;
    cur = getTargetVal(ts[idx], index);
    if (!stepDist[cur - prev]) {
      stepDist[cur - prev] = 0;
    }
    stepDist[cur - prev]++;
  }
  steps = (function() {
    var _results;
    _results = [];
    for (step in stepDist) {
      _results.push(step);
    }
    return _results;
  })();
  return getGCD(steps);
};

getTargetVal = function(dat, index) {
  if (typeof dat === 'number' || typeof dat === 'boolean') {
    return dat;
  }
  if (dat instanceof Date) {
    return dat.getTime();
  }
  if (typeof dat === 'string') {
    return dat;
  }
  if ((index != null) && (dat[index] != null)) {
    return dat[index];
  }
  throw 'cannot estimate stepwise, `index` or `step` should be given';
};

getGCD = function(arr) {
  var gcd, idx, _getGCD, _i, _ref;
  _getGCD = function(a, b) {
    var c;
    while (b !== 0) {
      c = a % b;
      a = b;
      b = c;
    }
    return a;
  };
  gcd = arr[0];
  for (idx = _i = 1, _ref = arr.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; idx = 1 <= _ref ? ++_i : --_i) {
    gcd = _getGCD(gcd, arr[idx]);
    if (gcd === 1) {
      return 1;
    }
  }
  return gcd;
};

module.exports = interpolate;

if (module.parent == null) {
  expect = require('chai').expect;
  expect(estimeteStepwise([1, 4, 6, 8])).to.equal(1);
  expect(estimeteStepwise([
    {
      x: 1
    }, {
      x: 4
    }, {
      x: 6
    }, {
      x: 8
    }
  ], 'x')).to.equal(1);
  expect(estimeteStepwise([
    {
      x: new Date(2013, 0, 1)
    }, {
      x: new Date(2013, 0, 4)
    }, {
      x: new Date(2013, 0, 6)
    }, {
      x: new Date(2013, 0, 8)
    }
  ], 'x')).to.equal(86400000);
  expect(estimeteStepwise([4, 7, 10, 16, 22, 28])).to.equal(3);
}
