package freqs

// Complete the freqQuery function below.
func freqQuery(queries [][]int32) []int32 {
	out := []int32{}
	freqCount := map[int32]int32{}

	for _, query := range queries {
		op := query[0]
		v := query[1]

		switch op {
		case 1:
			freqCount[v]++
		case 2:
			if f, prs := freqCount[v]; prs && f > 0 {
				freqCount[v]--
			}
		case 3:
			var res int32

			for _, f := range freqCount {
				if v == f {
					res = 1
					break
				}
			}

			out = append(out, res)
		}
	}

	return out
}
