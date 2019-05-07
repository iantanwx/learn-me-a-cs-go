function findDuplicate(numbers) {
  // Find a number that appears more than once ... in O(n) time
  const n = numbers.length - 1
  const head = numbers[numbers.length - 1];

  let marker = head;
  let steps = n;
  while (steps > 0) {
    marker = numbers[marker - 1];
    steps--;
  }

  let lenCycle = 0;
  let currentNode = marker;
  while (lenCycle === 0 || currentNode !== marker) {
    currentNode = numbers[currentNode - 1];
    lenCycle++;
  }

  let slow = head;
  let fast = slow;
  for (let i = 0; i < lenCycle; i++) {
    fast = numbers[fast - 1];
  }

  while (slow !== fast) {
    slow = numbers[slow - 1];
    fast = numbers[fast - 1];
  }

  return slow;
}


















// Tests

let desc = 'just the repeated number';
let actual = findDuplicate([1, 1]);
let expected = 1;
assertEqual(actual, expected, desc);

desc = 'short array';
actual = findDuplicate([1, 2, 3, 2]);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'medium array';
actual = findDuplicate([1, 2, 5, 5, 5, 5]);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'long array';
actual = findDuplicate([4, 1, 4, 8, 3, 2, 7, 6, 5]);
expected = 4;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
