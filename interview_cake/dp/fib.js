function fib(n) {
  return fibDP(n);
}

// Bottom-up approach, 0(1) space
function fibDP(n) {
  if (n === 0) {
    return 0;
  }

  let nm1 = 1;
  let nm2 = 1;

  for (let i = 2; i < n; i++) {
    const next = nm1+nm2;
    nm1 = nm2;
    nm2 = next;
  }

  return nm2;
}

function fibMemo(n, memo) {
  // Compute the nth Fibonacci number
  if (n <= 0) {
    return n;
  }

  if (n <= 2) {
    return 1;
  }

  if (memo[n]) {
    return memo[n];
  }

  const f = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo[n] = f;

  return f;
}

// O(2^n)
function fibRec(n) {
  if (n <= 2) {
    return 1;
  }

  return fib(n - 1) + fib(n - 2);
}

// Tests

let desc = 'zeroth fibonacci';
let actual = fib(0);
let expected = 0;
assertEqual(actual, expected, desc);

desc = 'first fibonacci';
actual = fib(1);
expected = 1;
assertEqual(actual, expected, desc);

desc = 'second fibonacci';
actual = fib(2);
expected = 1;
assertEqual(actual, expected, desc);

desc = 'third fibonacci';
actual = fib(3);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'fifth fibonacci';
actual = fib(5);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'tenth fibonacci';
actual = fib(10);
expected = 55;
assertEqual(actual, expected, desc);

desc = 'negative fibonacci';
const negativeFib = () => fib(-1);
assertThrowsError(negativeFib, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}

function assertThrowsError(func, desc) {
  try {
    func();
    console.log(`${desc} ... FAIL`);
  } catch (e) {
    console.log(`${desc} ... PASS`);
  }
}
