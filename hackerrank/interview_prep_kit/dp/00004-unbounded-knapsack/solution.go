package main

func knapsackRec(t int32, sum int32, nums []int32) int32 {
	if len(nums) == 0 {
		return sum
	}

	if sum+nums[0] > t {
		return knapsackRec(t, sum, nums[1:])
	}

	return max(knapsackRec(t, sum+nums[0], nums), knapsackRec(t, sum+nums[0], nums[1:]), knapsackRec(t, sum, nums[1:]))
}

func max(nums ...int32) int32 {
	hi := int32(0)
	for _, n := range nums {
		if n > hi {
			hi = n
		}
	}

	return hi
}
