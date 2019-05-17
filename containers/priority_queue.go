package containers

import (
	"container/heap"
	"errors"
)

type Item struct {
	index    int
	key      int
	priority int
}

func (i Item) Key() int {
	return i.key
}

func (i Item) Priority() int {
	return i.priority
}

func NewItem(key int, priority int) *Item {
	return &Item{key: key, priority: priority}
}

type PriorityQueue struct {
	arr     []*Item
	entries map[int]*Item
}

func (pq PriorityQueue) Len() int {
	return len(pq.arr)
}

func (pq PriorityQueue) Less(i, j int) bool {
	return pq.arr[i].priority < pq.arr[j].priority
}

func (pq PriorityQueue) Swap(i, j int) {
	pq.arr[i], pq.arr[j] = pq.arr[j], pq.arr[i]
	pq.arr[i].index = j
	pq.arr[j].index = i
}

func (pq *PriorityQueue) Push(x interface{}) {
	n := len(pq.arr)
	item := x.(*Item)
	item.index = n
	pq.arr = append(pq.arr, item)
	pq.entries[item.key] = item
}

func (pq *PriorityQueue) Pop() interface{} {
	old := pq.arr
	n := len(old)
	item := old[n-1]
	item.index = -1 // for safety
	pq.arr = old[0 : n-1]
	delete(pq.entries, item.key)
	return item
}

func (pq *PriorityQueue) GetItem(key int) (Item, error) {
	item, prs := pq.entries[key]
	if prs {
		return *item, nil
	}

	return *item, errors.New("No such item")
}

func (pq *PriorityQueue) Contains(key int) bool {
	_, prs := pq.entries[key]
	return prs
}

func (pq *PriorityQueue) Update(key int, priority int) error {
	item, prs := pq.entries[key]
	if !prs {
		return errors.New("Key not found")
	}

	item.priority = priority
	heap.Fix(pq, item.index)
	return nil
}

func NewPriorityQueue(n int) *PriorityQueue {
	pq := &PriorityQueue{
		arr:     make([]*Item, n),
		entries: make(map[int]*Item),
	}
	heap.Init(pq)

	return pq
}
