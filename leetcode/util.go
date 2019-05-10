package leetcode

import (
	"math"
)

func min(nums ...int) int {
	lowest := math.MaxInt64
	for _, n := range nums {
		if n < lowest {
			lowest = n
		}
	}

	return lowest
}
