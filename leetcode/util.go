package leetcode

import (
	"container/heap"
	"errors"
	"math"
)

// Item is an Item that can be inserted into a PriorityQueue
type Item struct {
	index    int
	key      int
	priority int
}

// Key returns the key of the item
// This is used to find the item when updating etc.
func (i Item) Key() int {
	return i.key
}

// Priority returns the priority of the item
func (i Item) Priority() int {
	return i.priority
}

// NewItem returns a pointer a new Item
func NewItem(key int, priority int) *Item {
	return &Item{key: key, priority: priority}
}

// PriorityQueue implements heap.Interface
type PriorityQueue struct {
	arr     []*Item
	entries map[int]*Item
}

// Len implements sort.Interface
func (pq PriorityQueue) Len() int {
	return len(pq.arr)
}

// Less implements sort.Interface
func (pq PriorityQueue) Less(i, j int) bool {
	return pq.arr[i].priority < pq.arr[j].priority
}

// Swap implements sort.Interface
func (pq PriorityQueue) Swap(i, j int) {
	pq.arr[i], pq.arr[j] = pq.arr[j], pq.arr[i]
	pq.arr[i].index = i
	pq.arr[j].index = j
}

// Push implements heap.Interface
func (pq *PriorityQueue) Push(x interface{}) {
	n := len(pq.arr)
	item := x.(*Item)
	item.index = n
	pq.arr = append(pq.arr, item)
	pq.entries[item.key] = item
}

// Pop implements heap.Interface
func (pq *PriorityQueue) Pop() interface{} {
	old := pq.arr
	n := len(old)
	item := old[n-1]
	item.index = -1 // for safety
	pq.arr = old[0 : n-1]
	delete(pq.entries, item.key)
	return item
}

// GetItem returns an item in the heap by key if it is on the heap.
func (pq *PriorityQueue) GetItem(key int) (Item, error) {
	item, prs := pq.entries[key]
	if prs {
		return *item, nil
	}

	return *item, errors.New("No such item")
}

// Contains returns bool representing the presences/lack thereof of the Item
// with the corresponding key in the heap
func (pq *PriorityQueue) Contains(key int) bool {
	_, prs := pq.entries[key]
	return prs
}

// Update updates the priority of the item with the corresponding key. Returns
// an error if the Item is not in the PriorityQueue
func (pq *PriorityQueue) Update(key int, priority int) error {
	item, prs := pq.entries[key]
	if !prs {
		return errors.New("Key not found")
	}
	item.priority = priority
	heap.Fix(pq, item.index)
	return nil
}

// NewPriorityQueue returns a PriorityQueue
func NewPriorityQueue() PriorityQueue {
	pq := PriorityQueue{
		arr:     []*Item{},
		entries: make(map[int]*Item),
	}

	return pq
}

func max(nums ...int) int {
	highest := math.MinInt64
	for _, n := range nums {
		if n > highest {
			highest = n
		}
	}

	return highest
}

func min(nums ...int) int {
	lowest := math.MaxInt64
	for _, n := range nums {
		if n < lowest {
			lowest = n
		}
	}

	return lowest
}
