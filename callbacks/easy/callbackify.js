// Problem Description – callbackify(fn)
//
// You are required to write a function named callbackify that takes a function
// which returns a Promise.
// The function should return a new function that accepts a callback as its
// last argument.
// When the Promise resolves, the callback should be called with `(null, data)`.
// When the Promise rejects, the callback should be called with the error.

function callbackify(promisFn) {
  return (...args) => {
    const cb = args.pop(-1);
    promisFn(...args)
      .then((data) => cb(null, data))
      .catch((err) => cb(err));
  };
}

module.exports = callbackify;
