function changePossibilities(amountLeft, denominations) {
  const memo = {};
  return changePossibilitiesDP(amountLeft, denominations, memo);
}

// Naive O(2^n) without memo table
// O(n*m) with memo table
function changePossibilitiesRec(amountLeft, denominations, memo = {}) {
  // edge case: no amount to make change for
  if (amountLeft === 0) {
    return 1;
  }

  const key = `${amountLeft},[${denominations.join(', ')}]`;

  if (memo[key]) {
    return memo[key];
  }

  // base case: no coins left
  if (!denominations.length || denominations[0] > amountLeft) {
    return 0;
  }

  // base case: we made change
  if (amountLeft - denominations[0] === 0) {
    return 1;
  }

  // we must do the work :(
  const [head, ...tail] = denominations;

  const ways =
    changePossibilitiesRec(amountLeft - head, denominations, memo) +
    changePossibilitiesRec(amountLeft, tail, memo);

  memo[key] = ways;

  return ways;
}

function changePossibilitiesDP(amountLeft, denominations) {
  if (amountLeft === 0) {
    return 1;
  }

  if (!denominations.length) {
    return 0;
  }

  const dp = [];
  // initialise the matrix
  for (let i = 0; i < denominations.length; i++) {
    dp.push(Array(amountLeft + 1).fill(0));
  }

  for (let j = 0; j < denominations.length; j++) {
    for (let k = 0; k <= amountLeft; k++) {
      const denom = denominations[j];
      if (k === 0) {
        dp[j][k] = 1;
        continue;
      };

      if (j === 0) {
        dp[j][k] = k % denom !== 0 ? 0 : 1;
        continue;
      }

      if (k >= denom) {
        dp[j][k] = 1 + Math.max(dp[j][k - 1], dp[j-1][k]);
      } else {
        dp[j][k] = Math.max(dp[j][k - 1], dp[j-1][k]);
      }
    }
  }

  return dp[denominations.length - 1][amountLeft - 1];
};

// Tests

let desc = 'sample input';
let actual = changePossibilities(4, [1, 2, 3]);
let expected = 4;
assertEqual(actual, expected, desc);

// desc = 'one way to make zero cents';
// actual = changePossibilities(0, [1, 2]);
// expected = 1;
// assertEqual(actual, expected, desc);

// desc = 'no ways if no coins';
// actual = changePossibilities(1, []);
// expected = 0;
// assertEqual(actual, expected, desc);

// desc = 'big coin value';
// actual = changePossibilities(5, [25, 50]);
// expected = 0;
// assertEqual(actual, expected, desc);

// desc = 'big target amount';
// actual = changePossibilities(50, [5, 10]);
// expected = 6;
// assertEqual(actual, expected, desc);

// desc = 'change for one dollar';
// actual = changePossibilities(100, [1, 5, 10, 25, 50]);
// expected = 292;
// assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
