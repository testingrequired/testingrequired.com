---
path: /blog/writing-your-own-testing-tools
title: Writing Your Own Testing Tools
date: '2020-02-25'
---

For the purpose of this post imagine that you work at a company at which there are strict rules around the use of third party software. While you can use open source the red tape required would stifle a new project that's high priority for the company. This means you'll largely be implementing everything yourself.

## Assert

Where would you even start? Well the core of a test is an assertion of a value state: true or false.

- `1 === 1`
- `'example'.length > 5`

So we need to implement an `assert` method.

```javascript
function assert(value) {}
```

Ok, so let's try and use this function.

```javascript
assert(1 === 1);
assert('example'.length > 5);
```

It works! Well, kind of. What about this?

```javascript
assert(1 === 2);
```

This will still pass. The expectation is that an assertion error is thrown. This function's behavior doesn't meet our needs.

Normally we would use TDD to write tests around our expectations for this behavior, watching the test fail, implement and see the tests pass.

If `assert`'s behavior isn't meeting our expectations and this function is the core of a test how can we TDD this? Let's try this:

```javascript
function assert(value) {}

try {
  assert(1 === 2);
  console.log(`Test failed: assertion error not thrown`);
} catch (e) {
  console.log(`Test pass`);
}
```

Now if we run this we will see that the test failed and gives a reason why. This is a start. Let's get this test passing.

```javascript
function assert(value) {
  throw new Error();
}

try {
  assert(1 === 2);
  console.log(`Test failed: assertion error not thrown`);
} catch (e) {
  console.log(`Test pass`);
}
```

The test passes! Let's write another test.

```javascript
function assert(value) {
  throw new Error();
}

try {
  assert(1 === 2);
  console.log(`Test failed: assertion error not thrown`);
} catch (e) {
  console.log(`Test pass`);
}

try {
  assert(1 === 1);
  console.log(`Test pass`);
} catch (e) {
  console.log(`Test failed: assertion error was thrown`);
}
```

Whoops! We have a failing test. The `assert` function just throws an error regardless of the value. Let's fix that.

```javascript
function assert(value) {
  if (!value) {
    throw new Error();
  }
}

try {
  assert(1 === 2);
  console.log(`Test failed: assertion error not thrown`);
} catch (e) {
  console.log(`Test pass`);
}

try {
  assert(1 === 1);
  console.log(`Test pass`);
} catch (e) {
  console.log(`Test failed: assertion error was thrown`);
}
```

Test is now passing but the feedback from these tests aren't great. I see that an assertion error is thrown but that doesn't tell me anything.

```javascript
function assert(value) {
  if (!value) {
    throw new Error();
  }
}

try {
  assert(1 === 2);
  console.log(`Test failed: assertion error not thrown`);
} catch (e) {
  console.log(`Test pass`);
}

try {
  assert(1 === 1);
  console.log(`Test pass`);
} catch (e) {
  console.log(`Test failed: assertion error was thrown`);
}

try {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
    console.log('Test pass');
  }
} catch {
  console.log('Test failed: error message not passed');
}
```

Passing `false` to `assert` will cause it to throw an error, it will be caught, passing the error message to another `assert` to test our expected behavior. It will fail and throw another error. Let's fix the implementation.

```javascript
function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

try {
  assert(1 === 2);
  console.log(`Test failed: assertion error not thrown`);
} catch (e) {
  console.log(`Test pass`);
}

try {
  assert(1 === 1);
  console.log(`Test pass`);
} catch (e) {
  console.log(`Test failed: assertion error was thrown`);
}

try {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
    console.log('Test pass');
  }
} catch {
  console.log('Test failed: error message not passed');
}
```

Perfect. A message can now be passed to inform why the assertion failed.

I'm sure you see the problem here. This will quickly become verbose. It would be great to be able to write an abstraction for this.

```javascript
const tests = [];

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

function runTests(tests) {}

function test(testFn) {}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}
```

So the idea behind `test` is that it will accept a function and push it on to `tests`. That looks a little more familiar. If you'll notice the implementation for `test` and `runTests` are empty. We'll be test driving both of their implementations. Let's start with `test`.

The first problem to solve here is that pushing a test function on to `tests` is a side effect. We have three other calls to `test` so writing a test for that side effect is going to be awkward.

This touches on the idea of code testability. How hard is it to test something. Generally if something is hard to test you should re-examine your implementation. Let's use function currying to give us some control over those side effects making them testable.

```javascript
const tests = [];

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

function runTests(tests) {}

function createTestableTest(testsArray) {}

function test(testFn) {}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}
```

This will fail because `createTestableTest` doesn't yet return a callable function. Implementing that returned function should make the test pass.

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

function runTests(tests) {}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}
```

The test passed but the other's still aren't running because we still need to implement `runTests`. Let's think about what the expected behavior for this would be. It will take in an array of functions, call each function, fail on caught errors, everything else is a pass, results are logged. The expected behavior is that each test is called and the correct result is logged. What we need to implement next is a spy. Like everything else we will test drive this.

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

(() => {
  assert(typeof createSpy() === 'function', "createSpy didn't return function");
})();

(() => {
  const spy = createSpy();
  spy();
  assert(spy.calls.length === 1, 'Spy call not incrementing call count');
})();

function runTests(tests) {}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

function createSpy() {}
```

Tests failing. Let's implement.

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

(() => {
  assert(typeof createSpy() === 'function', "createSpy didn't return function");
})();

(() => {
  const spy = createSpy();
  spy();
  assert(spy.calls.length === 1, 'Spy call not incrementing call count');
})();

function runTests(tests) {}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

function createSpy() {
  const calls = [];

  function spy() {
    calls.push(null);
  }

  spy.calls = calls;

  return spy;
}
```

Tests are now passing. Spies should also capture call arguments. Test:

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

(() => {
  assert(typeof createSpy() === 'function', "createSpy didn't return function");
})();

(() => {
  const spy = createSpy();
  spy();
  assert(spy.calls.length === 1, 'Spy call not incrementing call count');
})();

(() => {
  const expectedArg = Symbol();
  const spy = createSpy();
  spy(expectedArg);
  assert(spy.calls[0][0] === expectedArg, 'Spy call arguments not passed');
})();

function runTests(tests) {}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

function createSpy() {
  const calls = [];

  function spy() {
    calls.push(null);
  }

  spy.calls = calls;

  return spy;
}
```

Implementation:

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

(() => {
  assert(typeof createSpy() === 'function', "createSpy didn't return function");
})();

(() => {
  const spy = createSpy();
  spy();
  assert(spy.calls.length === 1, 'Spy call not incrementing call count');
})();

(() => {
  const expectedArg = Symbol();
  const spy = createSpy();
  spy(expectedArg);
  assert(spy.calls[0][0] === expectedArg, 'Spy call arguments not passed');
})();

function runTests(tests) {}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

function createSpy() {
  const calls = [];

  function spy(...args) {
    calls.push(args);
  }

  spy.calls = calls;

  return spy;
}
```

We should now be able to test drive implementing `runTests`. Test:

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

(() => {
  assert(typeof createSpy() === 'function', "createSpy didn't return function");
})();

(() => {
  const spy = createSpy();
  spy();
  assert(spy.calls.length === 1, 'Spy call not incrementing call count');
})();

(() => {
  const expectedArg = Symbol();
  const spy = createSpy();
  spy(expectedArg);
  assert(spy.calls[0][0] === expectedArg, 'Spy call arguments not passed');
})();

(() => {
  const test1 = createSpy();
  const test2 = createSpy();

  runTests([test1, test2]);

  assert(test1.calls.length === 1, 'test1 not called');
  assert(test2.calls.length === 1, 'test2 not called');
})();

function runTests(tests) {}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

function createSpy() {
  const calls = [];

  function spy(...args) {
    calls.push(args);
  }

  spy.calls = calls;

  return spy;
}
```

Implementation:

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

(() => {
  assert(typeof createSpy() === 'function', "createSpy didn't return function");
})();

(() => {
  const spy = createSpy();
  spy();
  assert(spy.calls.length === 1, 'Spy call not incrementing call count');
})();

(() => {
  const expectedArg = Symbol();
  const spy = createSpy();
  spy(expectedArg);
  assert(spy.calls[0][0] === expectedArg, 'Spy call arguments not passed');
})();

(() => {
  const test1 = createSpy();
  const test2 = createSpy();

  runTests([test1, test2]);

  assert(test1.calls.length === 1, 'test1 not called');
  assert(test2.calls.length === 1, 'test2 not called');
})();

function runTests(tests) {
  for (const test of tests) {
    test();
  }
}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

function createSpy() {
  const calls = [];

  function spy(...args) {
    calls.push(args);
  }

  spy.calls = calls;

  return spy;
}
```

The next thing to implement is reporting test results. We will be setting `console.log` to a spy to we can test this.

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

(() => {
  assert(typeof createSpy() === 'function', "createSpy didn't return function");
})();

(() => {
  const spy = createSpy();
  spy();
  assert(spy.calls.length === 1, 'Spy call not incrementing call count');
})();

(() => {
  const expectedArg = Symbol();
  const spy = createSpy();
  spy(expectedArg);
  assert(spy.calls[0][0] === expectedArg, 'Spy call arguments not passed');
})();

(() => {
  const test1 = createSpy();
  const test2 = createSpy();

  runTests([test1, test2]);

  assert(test1.calls.length === 1, 'test1 not called');
  assert(test2.calls.length === 1, 'test2 not called');
})();

(() => {
  const consoleLogOld = console.log;
  console.log = createSpy();

  const test1 = function() {};
  const test2 = function() {};

  runTests([test1, test2]);

  try {
    assert(console.log.calls.length === 2, 'console.log not called');
    assert(console.log.calls[0][0] === 'Test passed');
    assert(console.log.calls[1][0] === 'Test passed');
  } finally {
    console.log = consoleLogOld;
  }
})();

function runTests(tests) {
  for (const test of tests) {
    test();
  }
}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

function createSpy() {
  const calls = [];

  function spy(...args) {
    calls.push(args);
  }

  spy.calls = calls;

  return spy;
}
```

Implementation:

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

(() => {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
})();

(() => {
  assert(typeof createSpy() === 'function', "createSpy didn't return function");
})();

(() => {
  const spy = createSpy();
  spy();
  assert(spy.calls.length === 1, 'Spy call not incrementing call count');
})();

(() => {
  const expectedArg = Symbol();
  const spy = createSpy();
  spy(expectedArg);
  assert(spy.calls[0][0] === expectedArg, 'Spy call arguments not passed');
})();

(() => {
  const test1 = createSpy();
  const test2 = createSpy();

  runTests([test1, test2]);

  assert(test1.calls.length === 1, 'test1 not called');
  assert(test2.calls.length === 1, 'test2 not called');
})();

(() => {
  const consoleLogOld = console.log;
  console.log = createSpy();

  const test1 = function() {};
  const test2 = function() {};

  runTests([test1, test2]);

  try {
    assert(console.log.calls.length === 2, 'console.log not called');
    assert(console.log.calls[0][0] === 'Test passed');
    assert(console.log.calls[1][0] === 'Test passed');
  } finally {
    console.log = consoleLogOld;
  }
})();

function runTests(tests) {
  for (const test of tests) {
    test();
    console.log('Test passed');
  }
}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

function createSpy() {
  const calls = [];

  function spy(...args) {
    calls.push(args);
  }

  spy.calls = calls;

  return spy;
}
```

Ok so let's now convert our recent tests to use `test` and pass `tests` to `runTests`.

```javascript
const tests = [];

const test = createTestableTest(tests);

test(function() {
  try {
    assert(1 === 2, 'Assertion error not thrown');
  } catch (e) {
    assert(true);
  }
});

test(function() {
  try {
    assert(1 === 1);
  } catch (e) {
    assert(false, 'Assertion error was thrown');
  }
});

test(function() {
  try {
    assert(false, 'Value passed is false');
  } catch (e) {
    assert(e.message === 'Value passed is false');
  }
});

test(function() {
  const testsArray = [];
  const testableTest = createTestableTest(testsArray);
  testableTest(function() {});
  assert(testsArray.length === 1, 'Test was not push on to array');
});

test(function() {
  assert(typeof createSpy() === 'function', "createSpy didn't return function");
});

test(function() {
  const spy = createSpy();
  spy();
  assert(spy.calls.length === 1, 'Spy call not incrementing call count');
});

test(function() {
  const expectedArg = Symbol();
  const spy = createSpy();
  spy(expectedArg);
  assert(spy.calls[0][0] === expectedArg, 'Spy call arguments not passed');
});

test(function() {
  const test1 = createSpy();
  const test2 = createSpy();

  runTests([test1, test2]);

  assert(test1.calls.length === 1, 'test1 not called');
  assert(test2.calls.length === 1, 'test2 not called');
});

test(function() {
  const consoleLogOld = console.log;
  console.log = createSpy();

  const test1 = function() {};
  const test2 = function() {};

  runTests([test1, test2]);

  try {
    assert(console.log.calls.length === 2, 'console.log not called');
    assert(console.log.calls[0][0] === 'Test passed');
    assert(console.log.calls[1][0] === 'Test passed');
  } finally {
    console.log = consoleLogOld;
  }
});

runTests(tests);

function runTests(tests) {
  for (const test of tests) {
    test();
    console.log('Test passed');
  }
}

function createTestableTest(testsArray) {
  return function test(testFn) {
    testsArray.push(testFn);
  };
}

function assert(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

function createSpy() {
  const calls = [];

  function spy(...args) {
    calls.push(args);
  }

  spy.calls = calls;

  return spy;
}
```

All tests running. All tests passing.

## Phase 2
