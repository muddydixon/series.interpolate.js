if typeof require isnt 'undefined'
  interpolate = require '../src/interpolate'
  expect = require('chai').expect
  d3 = require 'd3'
else
  mocha.setup('bdd')
  expect = chai.expect
  
testDataNum = 20


describe 'Interpolate', ->
  describe 'interpolate simple number array', ->
    it 'with no opt', ->
      correct = [0..testDataNum].map (d)-> d
      # console.log interpolate([0, 1, 3, 5, 6, testDataNum]), correct
      expect(interpolate([0, 1, 3, 5, 6, testDataNum])[0]).to.deep.equal(correct)

    it 'with stepwise', ->
      correct = [0..testDataNum * 2].map (d)-> d / 2
      interpolate([0, 0.5, 3, 5.5, 6, testDataNum], {step: 0.5})[0].forEach (d, idx)->
        expect(d).to.deep.equal correct[idx]

    it 'with no opt 3 step', ->
      correct = d3.range(0, 30, 3)
      expect(interpolate([0, 3, 9, 27])[0]).to.deep.equal(correct)
      
    it 'with no opt 3 step complamenting const value', ->
      correct = [0, 3, 10, 9, 10, 10, 10, 10, 10, 27]
      expect(interpolate([0, 3, 9, 27], {defaults: 10})[0]).to.be.eql correct
      
        
  describe 'interpolate object array', ->
    it 'with no opt', ->
      correct = [0..testDataNum].map (d)-> {x: d}
      interpolate([{x:0},{x:1}, {x:testDataNum}])[0].forEach (d, idx)->
        expect(d).to.deep.equal correct[idx]
        
    it 'with stepwise', ->
      correct = [0..testDataNum * 2].map (d)-> {x: 2 * d}
      interpolate([0,4,16,testDataNum].map((d)-> {x:d}), {step: 2})[0].forEach (d, idx)->
        expect(d).to.deep.equal correct[idx]

    it 'with no opt 4 step', ->
      correct = d3.range(0, 30, 4).map (d)-> {x: d}
      
      interpolate([0, 4, 16, 28].map((d)-> {x: d}))[0].map (d, idx)->
        expect(d).to.deep.equal(correct[idx])
      
    it 'with no opt 3 step complamenting const value', ->
      correct = [0, 3, 10, 9, 10, 10, 10, 10, 10, 27].map (d, idx)-> {x: idx * 3, v: d * d}

      expect(interpolate([0, 3, 9, 27].map((d)-> {x: d, v: d * d}), {defaults: {v: 100}})[0]).to.be.eql correct
      
  # describe 'interpolate Date array', ->
  #   it 'with no opt', ->
  #     correct = [0..testDataNum].map (d)-> new Date(2013, 0, d)
  #     interpolate([0, 1, 2, testDataNum].map((d)-> new Date(2013, 0, d))).forEach (d, idx)->
  #       expect(d).to.deep.equal correct[idx]
      
  #   it 'with no opt and object containing Date', ->
  #     correct = [0..testDataNum].map (d)-> {x: new Date(2013, 0, d)}
  #     interpolate([0, 1, 2, testDataNum].map((d)->
  #       {x: new Date(2013, 0, d)})).forEach (d, idx)->
  #         expect(d).to.deep.equal correct[idx]
      
  # describe 'interpolate pseude data array', ->
  #   it 'with no opt', ->
  #     correct = [0..testDataNum].map (d)->
  #       {x: new Date(2013, 0, d), v: 100 - d}
  #     testData = correct.slice(0, 1)
  #       .concat(d3.shuffle(correct.slice(1))
  #       .slice(0, 0| testDataNum * 0.5)
  #       .sort((a, b)-> a.x - b.x))

  #     interpolate(testData).map (d, idx)->
  #       console.log d, correct[idx]
  #       expect(d).to.deep.equal correct[idx]
      
  #   it 'with default value', ->
  #     correct = [0..testDataNum].map (d)->
  #       {x: new Date(2013, 0, d), v: 100 - d}
  #     testData = correct.slice(0, 1)
  #       .concat(d3.shuffle(correct.slice(1))
  #       .slice(0, 0| testDataNum * 0.5)
  #       .sort((a, b)-> a.x - b.x))

  #     interpolate(testData, {default: 0}).map (d, idx)->
  #       expect(d).to.deep.equal correct[idx]
      
if typeof require is 'undefined'
  mocha.run()
