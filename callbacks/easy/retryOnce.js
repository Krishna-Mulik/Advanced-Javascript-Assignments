// Problem Description – retryOnce(fn)
//
// You are given a function `fn` that returns a Promise.
// Your task is to return a new function that calls `fn` and retries it once
// if the first attempt rejects.
// If the second attempt also rejects, the error should be propagated.

function retryOnce(fn) {
  let isCompleted = false;
  let retries = 0;
  const maxRetries = 1;

  return (cb) => {
    while (!isCompleted) {
      fn((err, data) => {
        if (data) {
          isCompleted = true;
        } else {
          isCompleted = retries++ == maxRetries;
        }

        if (isCompleted) {
          cb(err, data);
        }
      });
    }
  };
}

module.exports = retryOnce;
