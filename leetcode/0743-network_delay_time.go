package leetcode

import (
	"container/heap"
	"math"
)

type weightedNode [2]int

type graph []weightedNode

func networkDelayTime(times [][]int, N int, K int) int {
	graph := make([][]weightedNode, N+1)
	for _, e := range times {
		u := e[0]
		v := e[1]
		w := e[2]

		adj := graph[u]
		adj = append(adj, weightedNode{v, w})
		graph[u] = adj
	}

	pq := NewPriorityQueue()
	// push all vertices onto our priority queue
	for v := 1; v <= N; v++ {
		item := NewItem(v, math.MaxInt64)
		heap.Push(&pq, item)
	}

	pq.Update(K, 0)

	dist := make(map[int]int)
	for pq.Len() > 0 {
		item := heap.Pop(&pq).(*Item)
		u := item.Key()
		w := item.Priority()
		dist[u] = w

		for _, v := range graph[u] {
			if pq.Contains(v[0]) {
				adj, _ := pq.GetItem(v[0])
				if dist[u]+v[1] < adj.Priority() {
					pq.Update(v[0], dist[u]+v[1])
				}
			}
		}
	}

	var longest int
	for _, v := range dist {
		// this means we didn't relax one of the edges.
		// by implication, that means it wasn't reachable.
		if v == math.MaxInt64 {
			return -1
		}

		if v > longest {
			longest = v
		}
	}

	return longest
}
