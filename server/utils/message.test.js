const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('- generateMessage', () => {
  it('should generate message with given data', () => {
    let temp = {
      from:"username", 
      text:"randomtext"
    };
    let message = generateMessage(temp.from, temp.text);
    expect(message.from).toBe(temp.from);
    expect(message.text).toBe(temp.text);
    expect(message.createdAt).toBeA('number');
  });
});

describe('- generateLocationMessage', () => {
  it('should generate location object', () => {
    let temp = {
      from:"username", 
      lat: 1, 
      lng: 2
    };
    let message = generateLocationMessage(temp.from, temp.lat, temp.lng);
    expect(message.from).toBe(temp.from);
    expect(message.uri).toBe(`https://www.google.com/maps/preview/@${temp.lat},${temp.lng},14z`);
    expect(message.createdAt).toBeA('number');
  });
});