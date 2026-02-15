// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.

//the once function uses the concept of in-flight deduplication.
//in-flight: in progress (eg. fetch which is not completed).
//deuplication: preventing duplicate work (eg. prevention of same API call)

function once(fn) {
  let isFinished = false;
  let isCalled = false;
  let result = null;
  let waitingCallbacks = [];

  return (...args) => {
    const cb = args.pop();

    if (isFinished) {
      cb(...result);
      return;
    }

    waitingCallbacks.push(cb);

    if (isCalled) return;
    isCalled = true;

    fn(...args, (err, data) => {
      isFinished = true;
      result = [err, data];

      for (const callback of waitingCallbacks) {
        callback(err, data);
      }
    });
  };
}

module.exports = once;
