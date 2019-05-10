//  Implement the enqueue and dequeue methods
class QueueTwoStacks {
  constructor() {
    this.stacks = { left: [], right: [] }
  }
  enqueue(item) {
    const { left, right } = this.stacks;
    // both are empty, put on left
    if (!right.length) {
      right.push(item);

      return;
    }

    let toPop = right.length;
    while (toPop > 0) {
      left.push(right.pop());
      toPop--;
    }
    left.push(item);

    let toPush = left.length;
    while (toPush > 0) {
      right.push(left.pop());
      toPush--;
    }
  }

  dequeue() {
    const {right} = this.stacks;
    if (!right.length) {
      throw new Error('Queue is empty!');
    }
    return right.pop();
  }
}

// Tests
const q = new QueueTwoStacks();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

let desc = 'dequeue #1';
let actual = q.dequeue();
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'dequeue #2';
actual = q.dequeue();
expected = 2;
assertEquals(actual, expected, desc);

q.enqueue(4);

desc = 'dequeue #3';
actual = q.dequeue();
expected = 3;
assertEquals(actual, expected, desc);

desc = 'dequeue #4';
actual = q.dequeue();
expected = 4;
assertEquals(actual, expected, desc);

desc = 'dequeue from empty queue';
const emptyDequeue = () => q.dequeue();
assertThrowsError(emptyDequeue, desc);

function assertEquals(a, b, desc) {
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
