package leetcode

type Vertex [2]int

func isEscapePossible(blocked [][]int, source []int, target []int) bool {
	blockedLen := len(blocked)
	blockedMap := make(map[Vertex]bool)
	for _, v := range blocked {
		blockedMap[toVertex(v)] = true
	}

	sourceBlocked := checkBlocked(blockedMap, blockedLen, source, target)
	if sourceBlocked {
		return false
	}
	targetBlocked := checkBlocked(blockedMap, blockedLen, target, source)
	if targetBlocked {
		return false
	}

	return true
}

func checkBlocked(blockedMap map[Vertex]bool, blockedLen int, source []int, target []int) bool {
	depth := 0
	offsets := [][]int{{0, -1}, {1, 0}, {0, 1}, {-1, 0}}
	q := []Vertex{}
	q = append(q, toVertex(source))
	visited := make(map[Vertex]bool)

	// bfs, checking along the way if we have >= 200 distance
	for len(q) > 0 {
		for range q {
			current := q[0]
			q = q[1:]

			x := current[0]
			y := current[1]

			if x == target[0] && y == target[1] {
				return false
			}

			for _, o := range offsets {
				neighbour := [2]int{x + o[0], y + o[1]}
				_, isBlocked := blockedMap[neighbour]
				_, isVisited := visited[neighbour]
				isValid := validateVertex(neighbour)

				if !isBlocked && !isVisited && isValid {
					visited[neighbour] = true
					q = append(q, neighbour)
				}
			}
		}

		depth++
		if depth >= blockedLen {
			return false
		}
	}

	return true
}

func toVertex(v []int) Vertex {
	return [2]int{v[0], v[1]}
}

func validateVertex(v [2]int) bool {
	x := v[0]
	y := v[1]

	return x >= 0 && x < 1000000 && y >= 0 && y < 1000000
}
