package leetcode

func minPathSum(grid [][]int) int {
	// initialise a second grid
	lenX := len(grid[0])
	lenY := len(grid)
	paths := make([][]int, lenY)

	for i := 0; i < lenY; i++ {
		paths[i] = make([]int, lenX)
	}

	for y := 0; y < lenY; y++ {
		for x := 0; x < lenX; x++ {
			if x == 0 && y == 0 {
				paths[y][x] = grid[y][x]
				continue
			}

			// top row
			if y == 0 {
				paths[y][x] = paths[y][x-1] + grid[y][x]
				continue
			}

			// leftmost column
			if x == 0 {
				paths[y][x] = paths[y-1][x] + grid[y][x]
				continue
			}

			paths[y][x] = min(paths[y-1][x], paths[y][x-1]) + grid[y][x]
		}
	}

	return paths[lenY-1][lenX-1]
}
