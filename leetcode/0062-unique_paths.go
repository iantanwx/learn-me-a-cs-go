package leetcode

func uniquePaths(m int, n int) int {
	// initialise our matrix
	dp := make([][]int, n)
	for i := 0; i < n; i++ {
		dp[i] = make([]int, m)
	}

	for y := 0; y < n; y++ {
		for x := 0; x < m; x++ {
			// topmost row and leftmost column always 1
			if x == 0 || y == 0 {
				dp[y][x] = 1
			} else {
				dp[y][x] = dp[y-1][x] + dp[y][x-1]
			}
		}
	}

	return dp[n-1][m-1]
}
