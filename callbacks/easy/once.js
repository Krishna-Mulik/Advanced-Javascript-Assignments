// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.

function once(fn) {
  let isFnCalled = false;
  let fnResponse = [true];

  return (...args) => {
    const actualcb = args.pop();

    if (isFnCalled) {
      actualcb(...fnResponse);
      return;
    }

    isFnCalled = true;
    const cb = (err, data) => {
      fnResponse = [err, data];
      actualcb(err, data);
    };

    args.push(cb);

    fn(...args);
  };
}

module.exports = once;
