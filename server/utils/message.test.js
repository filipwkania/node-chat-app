const expect = require('expect');
const {generateMessage} = require('./message');

describe('- generateMessage', () => {
  it('should generate message with given data', () => {
    let temp = {from:"username", text:"randomtext"};
    let message = generateMessage(temp.from, temp.text);
    expect(message.from).toBe(temp.from);
    expect(message.text).toBe(temp.text);
    expect(message.createdAt).toBeA('number');
  });
});