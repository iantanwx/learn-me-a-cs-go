package leetcode

const (
	lparen = '('
	rparen = ')'
)

func longestValidParentheses(s string) int {
	max := 0
	dp := make([]int, len(s))
	for i := 1; i < len(s); i++ {
		char := s[i]
		// we only care about right parentheses
		if char == rparen {
			pred := s[i-1]
			// we have a nice, atomic pair
			if pred == lparen {
				if i >= 2 {
					dp[i] = dp[i-2] + 2
				} else {
					dp[i] = 2
				}
			}

			// if the predecessor is also a rparen, try to find its lparen
			lparenIndex := i - dp[i-1] - 1
			if lparenIndex >= 0 && s[i-dp[i-1]-1] == lparen {
				// suppose this is the end of the valid substring, add the
				// cumulative length of any _previous_ adjacent substring
				// which should be just one index _before_ our current one:
				// s[i-dp[i-1]-2]
				if lparenIndex-1 >= 0 {
					dp[i] = dp[i-1] + dp[lparenIndex-1] + 2
				} else {
					dp[i] = dp[i-1] + 2
				}
			}
		}

		if dp[i] > max {
			max = dp[i]
		}
	}

	return max
}
