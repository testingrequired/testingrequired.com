---
path: /blog/writing-your-own-testing-tools
title: Writing Your Own Testing Tools
date: '2020-02-25'
---

For the purpose of this post imagine that you work at a company at which there are strict rules around the use of third party software. While you can use open source the red tape required would stifle a new project that's high priority for the company. This means you'll largely be implementing everything yourself.

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

Perfect. A message can now be passed to inform why the assertion failed. I'm sure you see the problem here. This will quickly become verbose. It would be great to be able to write an abstraction for this.

```javascript
function test() {}

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
