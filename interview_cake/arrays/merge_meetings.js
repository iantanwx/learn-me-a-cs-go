function mergeRanges(meetings) {
  // O(n log n)
  const sortedMeetings = meetings.sort(
    (a, b) =>
      a.startTime < b.startTime ? -1 : a.startTime === b.startTime ? 0 : 1,
  );
  let current = sortedMeetings[0];
  const result = [];

  for (let i = 1; i < sortedMeetings.length; i++) {
    const meeting = sortedMeetings[i];

    // we have an overlap
    if (
      meeting.startTime >= current.startTime &&
      meeting.startTime <= current.endTime
    ) {
      // if the meeting's endTime is not > what we already have, do nothing
      if (meeting.endTime > current.endTime) {
        current.endTime = meeting.endTime;
      }
      continue;
    }

    // no overlap.
    result.push(current);
    current = meeting;
  }

  result.push(current);

  return result;
}

// Tests

let desc = 'meetings overlap';
let actual = mergeRanges([
  {startTime: 1, endTime: 3},
  {startTime: 2, endTime: 4},
]);
let expected = [{startTime: 1, endTime: 4}];
assertArrayEquals(actual, expected, desc);

desc = 'meetings touch';
actual = mergeRanges([{startTime: 5, endTime: 6}, {startTime: 6, endTime: 8}]);
expected = [{startTime: 5, endTime: 8}];
assertArrayEquals(actual, expected, desc);

desc = 'meeting contains other meeting';
actual = mergeRanges([{startTime: 1, endTime: 8}, {startTime: 2, endTime: 5}]);
expected = [{startTime: 1, endTime: 8}];
assertArrayEquals(actual, expected, desc);

desc = 'meetings stay separate';
actual = mergeRanges([{startTime: 1, endTime: 3}, {startTime: 4, endTime: 8}]);
expected = [{startTime: 1, endTime: 3}, {startTime: 4, endTime: 8}];
assertArrayEquals(actual, expected, desc);

desc = 'multiple merged meetings';
actual = mergeRanges([
  {startTime: 1, endTime: 4},
  {startTime: 2, endTime: 5},
  {startTime: 5, endTime: 8},
]);
expected = [{startTime: 1, endTime: 8}];
assertArrayEquals(actual, expected, desc);

desc = 'meetings not sorted';
actual = mergeRanges([
  {startTime: 5, endTime: 8},
  {startTime: 1, endTime: 4},
  {startTime: 6, endTime: 8},
]);
expected = [{startTime: 1, endTime: 4}, {startTime: 5, endTime: 8}];
assertArrayEquals(actual, expected, desc);

desc = 'oneLongMeetingContainsSmallerMeetings';
actual = mergeRanges([
  {startTime: 1, endTime: 10},
  {startTime: 2, endTime: 5},
  {startTime: 6, endTime: 8},
  {startTime: 9, endTime: 10},
  {startTime: 10, endTime: 12},
]);
expected = [{startTime: 1, endTime: 12}];
assertArrayEquals(actual, expected, desc);

desc = 'sample input';
actual = mergeRanges([
  {startTime: 0, endTime: 1},
  {startTime: 3, endTime: 5},
  {startTime: 4, endTime: 8},
  {startTime: 10, endTime: 12},
  {startTime: 9, endTime: 10},
]);
expected = [
  {startTime: 0, endTime: 1},
  {startTime: 3, endTime: 8},
  {startTime: 9, endTime: 12},
];
assertArrayEquals(actual, expected, desc);

function assertArrayEquals(a, b, desc) {
  const arrayA = JSON.stringify(a);
  const arrayB = JSON.stringify(b);
  if (arrayA !== arrayB) {
    console.log(`${desc} ... FAIL: ${arrayA} != ${arrayB}`);
  } else {
    console.log(`${desc} ... PASS`);
  }
}
