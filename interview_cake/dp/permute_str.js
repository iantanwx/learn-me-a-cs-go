function getPermutations(chars) {
  // Generate all permutations of the input string
  const permutations = new Set();

  // FIXME: should actually be simplified to <= 1
  if (!chars.length || chars.length === 1) {
    permutations.add(chars);
    return permutations;
  }

  for (let i = 0; i < chars.length; i++) {
    let prefix = chars.charAt(i);
    permutate(prefix, chars.replace(chars.charAt(i), ''), permutations);
  }
  console.log(permutations);

  return permutations;
}

function permutate(prefix, chars, set) {
  if (chars.length === 1) {
    return set.add(prefix + chars);
  }

  for (let i = 0; i < chars.length; i++) {
    permutate(
      prefix + chars.charAt(i),
      chars.replace(chars.charAt(i), ''),
      set,
    );
  }
}

// Tests

let desc = 'empty string';
let input = '';
let actual = getPermutations(input);
let expected = new Set(['']);
assert(isSetsEqual(actual, expected), desc);

desc = 'one character string';
input = 'a';
actual = getPermutations(input);
expected = new Set(['a']);
assert(isSetsEqual(actual, expected), desc);

desc = 'two character string';
input = 'ab';
actual = getPermutations(input);
expected = new Set(['ab', 'ba']);
assert(isSetsEqual(actual, expected), desc);

desc = 'three character string';
input = 'abc';
actual = getPermutations(input);
expected = new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
assert(isSetsEqual(actual, expected), desc);

function isSetsEqual(as, bs) {
  if (as.size !== bs.size) {
    return false;
  }
  for (let a of as) {
    if (!bs.has(a)) return false;
  }
  return true;
}

function assert(condition, desc) {
  if (condition) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL`);
  }
}
