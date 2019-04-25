package main

// Complete the getWays function below.
func getWays(n int64, c []int64) int64 {
	numCoins := len(c)
	tbl := make([][]int64, numCoins)

	for i := range c {
		tbl[i] = make([]int64, n+1)
	}

	for y := 0; y < numCoins; y++ {
		for x := 0; x <= int(n); x++ {
			if x == 0 {
				tbl[y][x] = 1
				continue
			}

			if y == 0 {
				if c[y] <= int64(x) && int64(x)%c[y] == 0 {
					tbl[y][x] = 1
				} else {
					tbl[y][x] = 0
				}

				continue
			}

			// have a match
			if c[y] <= int64(x) {
				tbl[y][x] = tbl[y-1][x] + tbl[y][int64(x)-c[y]]
				continue
			}

			tbl[y][x] = tbl[y-1][x]
		}
	}

	return tbl[numCoins-1][n]
}
