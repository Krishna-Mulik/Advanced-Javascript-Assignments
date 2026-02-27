// Problem Description – retryOnce(fn)
//
// You are given a function `fn` that returns a Promise.
// Your task is to return a new function that calls `fn` and retries it once
// if the first attempt rejects.
// If the second attempt also rejects, the error should be propagated.

function retryOnce(fn, maxRetries = 1) {
  return (cb) => {
    let retries = 0;

    const attempt = () => {
      fn((err, data) => {
        if (err && retries++ < maxRetries) {
          attempt();
          return;
        }

        cb(err, data);
      });
    };

    attempt();
  };
}

module.exports = retryOnce;
