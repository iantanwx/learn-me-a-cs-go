package leetcode

func findOrder(numCourses int, prerequisites [][]int) []int {
	// build our graph.
	// use an adjacency list to represent it.
	graph := make([][]int, numCourses)
	for _, p := range prerequisites {
		s := p[1]
		d := p[0]
		graph[s] = append(graph[s], d)
	}

	sort := topologicalSort(graph)
	if len(sort) == numCourses {
		return sort
	}

	return []int{}
}
