function isSingleRiffle(half1, half2, shuffledDeck) {
  let half1Index = 0;
  let half2Index = 0;
  let half1Max = half1.length - 1;
  let half2Max = half2.length - 1;

  for (let i = 0; i < shuffledDeck.length; i++) {
    const card = shuffledDeck[i];
    if (half1.length && half1Index <= half1Max && card === half1[half1Index]) {
      half1Index++;
      continue;
    }

    if (half2.length && half2Index <= half2Max && card === half2[half2Index]) {
      half2Index++;
      continue;
    }

    return false;
  }

  return true;
}

// Tests

let desc = 'both halves are the same length';
let actual = isSingleRiffle([1, 4, 5], [2, 3, 6], [1, 2, 3, 4, 5, 6]);
assertEquals(actual, true, desc);

desc = 'halves are different lengths';
actual = isSingleRiffle([1, 5], [2, 3, 6], [1, 2, 6, 3, 5]);
assertEquals(actual, false, desc);

desc = 'one half is empty';
actual = isSingleRiffle([], [2, 3, 6], [2, 3, 6]);
assertEquals(actual, true, desc);

desc = 'shuffled deck is missing cards';
actual = isSingleRiffle([1, 5], [2, 3, 6], [1, 6, 3, 5]);
assertEquals(actual, false, desc);

desc = 'shuffled deck has extra cards';
actual = isSingleRiffle([1, 5], [2, 3, 6], [1, 2, 3, 5, 6, 8]);
assertEquals(actual, false, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
