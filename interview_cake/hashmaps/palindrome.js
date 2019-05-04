function hasPalindromePermutation(theString) {
  // Check if any permutation of the input is a palindrome
  if (theString.length === 1) {
    return true;
  }

  const charMap = {};

  for (let i = 0; i < theString.length; i++) {
    const char = theString[i];
    if (!charMap[char]) {
      charMap[char] = 1;
      continue;
    }

    charMap[char]++;
  }

  const isEven = theString.length % 2 === 0;
  let numOdd = 0;
  for (const char in charMap) {
    if (charMap[char] % 2 === 1) {
      if (isEven) {
        return false;
      }

      if (!isEven && numOdd !== 0) {
        return false;
      }

      numOdd++;
      continue;
    }
  }

  return true;
}

// Tests

let desc = 'permutation with odd number of chars';
assertEqual(hasPalindromePermutation('aabcbcd'), true, desc);

desc = 'permutation with even number of chars';
assertEqual(hasPalindromePermutation('aabccbdd'), true, desc);

desc = 'no permutation with odd number of chars';
assertEqual(hasPalindromePermutation('aabcd'), false, desc);

desc = 'no permutation with even number of chars';
assertEqual(hasPalindromePermutation('aabbcd'), false, desc);

desc = 'empty string';
assertEqual(hasPalindromePermutation(''), true, desc);

desc = 'one character string ';
assertEqual(hasPalindromePermutation('a'), true, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
