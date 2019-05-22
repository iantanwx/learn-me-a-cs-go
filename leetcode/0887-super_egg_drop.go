package leetcode

func superEggDrop(eggs int, floors int) int {
	dp := make([][]int, eggs+1)
	for i := 0; i <= eggs; i++ {
		dp[i] = make([]int, floors+1)
	}

	for j := 1; j <= eggs; j++ {
		for k := 1; k <= floors; k++ {
			if j == 1 {
				dp[j][k] = k
				continue
			}

			res := make([]int, k+1)
			// let k be total floors, and x be the current floor being tested
			for x := 1; x <= k; x++ {
				res[x] = max(dp[j-1][x-1]+1, dp[j][k-x]+1)
			}
			dp[j][k] = min(res[1:]...)
		}
	}

	return dp[eggs][floors]
}

func superEggDropRec(eggs int, floors int) int {
	// base case
	if eggs == 1 || floors == 1 {
		return floors
	}

	res := []int{}
	// subproblem: how many moves do we take for n eggs, dropping first at
	// floor k for all k in floors
	for k := 1; k <= floors; k++ {
		// subproblem: how many moves do we make if it breaks or does not
		// break?
		// if the egg breaks, we have k - 1 floors left to try in the worst
		// case, and n - 1 eggs to try with
		didBreak := superEggDrop(eggs-1, k-1) + 1
		// if the egg does not break, we have to go upward to see if the egg
		// breaks at some higher floor. that means we try from _total_ floors
		// - k in the worst case, with the same number of eggs.
		var noBreak int
		// we're at the top floor and the egg did not break. we only make
		// 1 move in this case.
		if floors-k == 0 {
			noBreak = 1
		} else {
			noBreak = superEggDrop(eggs, floors-k) + 1
		}

		worst := max(didBreak, noBreak)
		res = append(res, worst)
	}

	return min(res...)
}
