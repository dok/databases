var expect = require('../../node_modules/chai/chai').expect;
var storage = require('../storage.js').storage;

describe('Storage utility object', function () {
  var messageOne = {
    username: 'John Ford',
    message: 'Hello this is John speaking',
    roomname: 'Exclusive'
  };
  var messageTwo = {
    username: 'Kim Chi',
    message: 'How many?',
    roomname: 'Rice Only'
  };


  it('should exist', function () {
    expect(storage).to.exist;
  });
  it('should push messages', function () {
    storage.push(messageOne);
    storage.push(messageTwo);
    expect(storage.getLength()).to.equal(2);
  });
  it('should get messages', function () {
    expect(storage.get(messageOne)[0]).to.equal(messageOne);
  });
});
