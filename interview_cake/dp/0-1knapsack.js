function maxDuffelBagValue(cakeTypes, weightCapacity) {
  return maxValDP(cakeTypes, weightCapacity);
}

function maxValRec(cakes, capacity) {
  // base case: our bag has no capacity left
  if (capacity <= 0) {
    return 0;
  }

  // base case: no cakes to choose from
  if (!cakes.length) {
    return 0;
  }

  const [targetCake] = cakes;

  // base case: target cake is ineligible
  if (targetCake.weight > capacity) {
    return 0;
  }

  if (targetCake.weight === 0) {
    if (targetCake.value === 0) {
      return maxValRec(cakes.slice(1), capacity);
    }

    return Infinity;
  }

  return Math.max(
    targetCake.value + maxValRec(cakes, capacity - targetCake.weight),
    maxValRec(cakes.slice(1), capacity),
  );
}

// O(m*n) time complexity
// O(n) auxilliary space complexity
function maxValDP(cakes, capacity) {
  // initialise the dp array. we don't need a table for this problem.
  // the initial row is for the case where there is only _one_ type of cake,
  // of { weight: 0, value: 0 }.
  const dp = Array(capacity + 1).fill(0);

  // loop over our cake types, snowballing as we go...
  for (let i = 0; i < cakes.length; i++) {
    const { weight, value } = cakes[i];
    if (weight === 0) {
      // we already initialised this row.
      if (value === 0) {
        continue;
      }

      // in this case we just keep adding to our bottomless pit.
      return Infinity;
    }

    // j is the capacity.
    for (let j = 0; j <= capacity; j++) {
      // we can consider taking this cake.
      if (j >= weight) {
        dp[j] = Math.max(dp[j], dp[j-weight] + value);
      }
    }
  }

  // finally, return the last index of our array.
  return dp[capacity];
}

// Tests

let desc = 'one cake';
let actual = maxDuffelBagValue([{weight: 2, value: 1}], 9);
let expected = 4;
assertEqual(actual, expected, desc);

desc = 'two cakes';
actual = maxDuffelBagValue([{weight: 4, value: 4}, {weight: 5, value: 5}], 9);
expected = 9;
assertEqual(actual, expected, desc);

desc = 'only take less valuable cake';
actual = maxDuffelBagValue([{weight: 4, value: 4}, {weight: 5, value: 5}], 12);
expected = 12;
assertEqual(actual, expected, desc);

desc = 'lots of cakes';
actual = maxDuffelBagValue(
  [
    {weight: 2, value: 3},
    {weight: 3, value: 6},
    {weight: 5, value: 1},
    {weight: 6, value: 1},
    {weight: 7, value: 1},
    {weight: 8, value: 1},
  ],
  7,
);
expected = 12;
assertEqual(actual, expected, desc);

desc = 'value to weight ratio is not optimal';
actual = maxDuffelBagValue(
  [{weight: 51, value: 52}, {weight: 50, value: 50}],
  100,
);
expected = 100;
assertEqual(actual, expected, desc);

desc = 'zero capacity';
actual = maxDuffelBagValue([{weight: 1, value: 2}], 0);
expected = 0;
assertEqual(actual, expected, desc);

desc = 'cake with zero value and weight';
actual = maxDuffelBagValue([{weight: 0, value: 0}, {weight: 2, value: 1}], 7);
expected = 3;
assertEqual(actual, expected, desc);

desc = 'cake with non-zero value and zero weight';
actual = maxDuffelBagValue([{weight: 0, value: 5}], 5);
assertEqual(isFinite(actual), false, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
