package triplets

// Complete the countTriplets function below.
func countTriplets(arr []int64, r int64) int64 {
	var count int64
	seconds := map[int64]int64{}
	thirds := map[int64]int64{}

	for _, n := range arr {
		if v, prs := thirds[n]; prs {
			count += v
		}

		if _, prs := seconds[n]; prs {
			thirds[n*r] += seconds[n]
		}

		seconds[n*r]++
	}

	return count
}
