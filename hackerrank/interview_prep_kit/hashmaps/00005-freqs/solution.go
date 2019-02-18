package freqs

// Complete the freqQuery function below.
func freqQuery(queries [][]int32) []int32 {
	out := []int32{}
	freqs := map[int32]int32{}
	freqCount := map[int32]int32{}

	for _, query := range queries {
		op := query[0]
		v := query[1]

		switch op {
		case 1:
			freqs[v]++
			freqCount[freqs[v]]++
			if cnt := freqCount[freqs[v]-1]; cnt > 0 {
				freqCount[freqs[v]-1]--
			}
		case 2:
			if f, prs := freqs[v]; prs && f > 0 {
				freqs[v]--
				freqCount[freqs[v]]++
				freqCount[freqs[v]+1]--
			}
		case 3:
			var res int32

			if f := freqCount[v]; f > 0 {
				res = 1
			}

			out = append(out, res)
		}
	}

	return out
}
