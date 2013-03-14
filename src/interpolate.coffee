((global)->
  if typeof require isnt "undefined"
    d3 = require 'd3'
  else
    d3 = global.d3
    
  if not d3?
    throw "d3 required"
  interpolate = (ts, opt)->
    opt = opt or {}
    index = opt.index or 'x'
    step  = +(opt.step  or estimeteStepwise(ts, index))
    defaults = opt.defaults

    cur = getTargetVal ts[0], index
    constructor = if ts[0][index]? then ts[0][index].constructor else ts[0].constructor

    idx = 0
    prev = getTargetVal ts[idx], index
    while ++idx < ts.length
      cur  = getTargetVal ts[idx], index

      if cur - prev isnt step
        interpolateCnt = (cur - prev) / step
        ip = d3.interpolate(ts[idx - 1], ts[idx])
        interpolatedList = [1..interpolateCnt - 1].map (d)->
          obj = ip(d / interpolateCnt)
          if obj[index]?
            _index = new constructor(obj[index])
            obj = copyObj(defaults) if defaults?
            obj[index] = _index
          else
            obj = copyObj(defaults) if defaults?
          copyObj(obj)
        Array.prototype.splice.apply(ts, [idx, 0].concat(interpolatedList))
        idx += interpolatedList.length
      prev = cur
    [ts, step]

  copyObj = (src)->
    JSON.parse(JSON.stringify(src))

  estimeteStepwise = (ts, index)->
    stepDist = {}

    cur = getTargetVal ts[0], index

    for idx in [1..ts.length - 1]
      prev = cur
      cur  = getTargetVal ts[idx], index
      
      stepDist[cur - prev] = 0 unless stepDist[cur - prev]
      stepDist[cur - prev]++

    steps = (step for step of stepDist)

    if steps.length is 1 then steps[0] else getGCD steps


  getTargetVal = (dat, index)->
    return dat if typeof dat is 'number' or typeof dat is 'boolean'
      
    return dat.getTime() if dat instanceof Date
      
    return dat if typeof dat is 'string'
    
    return dat[index] if index? and dat[index]?

    throw 'cannot estimate stepwise, `index` or `step` should be given'

  getGCD = (arr)->

    _getGCD = (a, b)->

          
      while b isnt 0
        c = a % b
        a = b
        b = c
      a

    gcd = arr[0]
    for idx in [1..arr.length - 1]
      gcd = _getGCD(gcd, arr[idx])
      return 1 if gcd is 1
    gcd

  ############################################################
  #
  # 
  if typeof module isnt "undefined"
    module.exports = interpolate
  else
    global.interpolate or (global.interpolate = interpolate)

)(this.self or global)    

if module? and not module.parent?
  do ()->
    expect = require('chai').expect
  
    expect(estimeteStepwise([1, 4, 6, 8])).to.equal(1)
    expect(estimeteStepwise([{x: 1}, {x: 4}, {x: 6}, {x: 8}], 'x')).to.equal(1)
    expect(estimeteStepwise([{x: new Date(2013, 0, 1)}, {x: new Date(2013, 0, 4)}, {x: new Date(2013, 0, 6)}, {x: new Date(2013, 0, 8)}], 'x')).to.equal(86400000)
    expect(estimeteStepwise([4, 7, 10, 16, 22, 28])).to.equal(3)
    
