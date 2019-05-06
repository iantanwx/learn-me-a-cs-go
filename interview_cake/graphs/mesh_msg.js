class Queue {
  constructor() {
    this.queue = [];
    this.size = 0;
  }

  enqueue(item) {
    this.queue.unshift(item);
    this.size += 1;
  }

  dequeue() {
    this.size -= 1;
    return this.queue.pop();
  }
}

function bfsGetPath(graph, startNode, endNode) {
  // Find the shortest route in the network between the two users
  if (!graph[startNode] || !graph[endNode]) {
    throw new Error('Start node or end node are not in the graph');
  }

  const parents = bfs(graph, startNode);
  const path = [];
  let currentNode = endNode;

  while (currentNode !== null) {
    path.unshift(currentNode);

    if (parents[currentNode] === undefined) {
      return null;
    }

    currentNode = parents[currentNode];
  }

  return path;
}

/**
 * bfs
 *
 * @param graph
 * @param startNode
 * Erik Demaine's BFS~
 * @returns {undefined}
 */
function bfs(adj, startNode) {
  if (!adj[startNode]) {
    throw new Error('Start node is not in the adjacency list');
  }

  const queue = new Queue();
  const level = {[startNode]: 0};
  const parent = {[startNode]: null};
  let i = 1;

  queue.enqueue(startNode);

  while (queue.size) {
    const vertex = queue.dequeue();
    adj[vertex].forEach(v => {
      if (level[v] === undefined) {
        level[v] = i;
        parent[v] = vertex;
        queue.enqueue(v);
      }
    });
    i++;
  }

  return parent;
}

// Tests
const graph = {
  a: ['b', 'c', 'd'],
  b: ['a', 'd'],
  c: ['a', 'e'],
  d: ['a', 'b'],
  e: ['c'],
  f: ['g'],
  g: ['f'],
};

let desc = 'two hop path 1';
let actual = bfsGetPath(graph, 'a', 'e');
let expected = ['a', 'c', 'e'];
assertDeepEqual(actual, expected, desc);

desc = 'two hop path 2';
actual = bfsGetPath(graph, 'd', 'c');
expected = ['d', 'a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 1';
actual = bfsGetPath(graph, 'a', 'c');
expected = ['a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 2';
actual = bfsGetPath(graph, 'f', 'g');
expected = ['f', 'g'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 3';
actual = bfsGetPath(graph, 'g', 'f');
expected = ['g', 'f'];
assertDeepEqual(actual, expected, desc);

desc = 'zero hop path';
actual = bfsGetPath(graph, 'a', 'a');
expected = ['a'];
assertDeepEqual(actual, expected, desc);

desc = 'no path';
actual = bfsGetPath(graph, 'a', 'f');
expected = null;
assertDeepEqual(actual, expected, desc);

desc = 'start node not present';
assertThrowsError(() => {
  bfsGetPath(graph, 'h', 'a');
}, desc);

desc = 'end node not present';
assertThrowsError(() => {
  bfsGetPath(graph, 'a', 'h');
}, desc);

function assertDeepEqual(a, b, desc) {
  const aStr = JSON.stringify(a);
  const bStr = JSON.stringify(b);
  if (aStr !== bStr) {
    console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
  } else {
    console.log(`${desc} ... PASS`);
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
