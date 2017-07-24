let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: (+new Date())
  }
};

let generateLocationMessage = (from, lat, lng) => {
  let uri = `https://www.google.com/maps/preview/@${lat},${lng},14z`;
  return {
    from,
    uri,
    createdAt: (+new Date())
  }
};

module.exports = {generateMessage, generateLocationMessage};