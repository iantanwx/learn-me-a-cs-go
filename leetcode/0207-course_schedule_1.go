package leetcode

func canFinish(numCourses int, prerequisites [][]int) bool {
	// build our graph.
	// use an adjacency list to represent it.
	graph := make([][]int, numCourses)
	for _, p := range prerequisites {
		s := p[1]
		d := p[0]
		graph[s] = append(graph[s], d)
	}

	order := topologicalSort(graph)
	if len(order) == numCourses {
		return true
	}

	return false
}

// topologicalSort will use Kahn's algorithm to perform our sort.
func topologicalSort(graph [][]int) []int {
	// 1. build indegree array.
	indegrees := make([]int, len(graph))
	for _, neighbours := range graph {
		for _, n := range neighbours {
			indegrees[n]++
		}
	}

	// 2. put all vertices with indegree == 0 into our queue
	q := []int{}
	for v, in := range indegrees {
		if in == 0 {
			q = append(q, v)
		}
	}

	// 3. poll queue and reduce neighbour vertex indegrees as we go
	sorted := []int{}
	for len(q) > 0 {
		v := q[0]
		q = q[1:]
		sorted = append(sorted, v)
		neighbours := graph[v]
		for _, n := range neighbours {
			indegrees[n]--
			in := indegrees[n]
			if in == 0 {
				q = append(q, n)
			}
		}
	}

	return sorted
}
