const PubSub = {
  publish: function (channel, payload) {
    const event = new CustomEvent(channel, {
      detail: payload
    });
    // console.dir(payload);
    document.dispatchEvent(event);
  },
  subscribe: function (channel, callback) {
    document.addEventListener(channel, callback);
  }
}

module.exports = PubSub;
