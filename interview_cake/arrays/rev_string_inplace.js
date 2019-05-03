function reverse(arrayOfChars) {
  const midPoint =
    arrayOfChars % 2 === 0
      ? arrayOfChars.length / 2
      : (arrayOfChars.length - 1) / 2;

  for (let i = 0; i < midPoint; i++) {
    const tmp = arrayOfChars[i];
    const target = arrayOfChars[arrayOfChars.length - 1 - i];
    arrayOfChars[i] = target;
    arrayOfChars[arrayOfChars.length - 1 - i] = tmp;
  }
}

// Tests

let desc = 'empty string';
let input = ''.split('');
reverse(input);
let actual = input.join('');
let expected = '';
assertEqual(actual, expected, desc);

desc = 'single character string';
input = 'A'.split('');
reverse(input);
actual = input.join('');
expected = 'A';
assertEqual(actual, expected, desc);

desc = 'longer string';
input = 'ABCDE'.split('');
reverse(input);
actual = input.join('');
expected = 'EDCBA';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
