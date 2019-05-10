function getClosingParen(sentence, openingParenIndex) {
  let open = 0;

  for (let i = openingParenIndex; i < sentence.length; i++) {
    const char = sentence.charAt(i);
    switch (char) {
      case '(': {
        open++;
        break;
      }

      case ')': {
        if (!open) {
          throw new Error('No corresponding opening parenthesis');
        }

        open--;
        if (open === 0) {
          return i;
        }
      }
    }
  }

  if (open) {
    throw new Error('No closer');
  }
}

// Tests
let desc = 'all openers then closers';
let actual = getClosingParen('((((()))))', 2);
let expected = 7;
assertEqual(actual, expected, desc);

desc = 'mixed openers and closers';
actual = getClosingParen('()()((()()))', 5);
expected = 10;
assertEqual(actual, expected, desc);

desc = 'no matching closer';
const noCloser = () => getClosingParen('()(()', 2);
assertThrowsError(noCloser, desc);

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
