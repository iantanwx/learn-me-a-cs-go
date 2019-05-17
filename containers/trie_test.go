package containers

import (
	"testing"
)

func TestTrie(t *testing.T) {
	tests := []struct {
		dict    []string
		queries []string
		out     []bool
	}{
		{
			[]string{"orange", "banana", "apple"},
			[]string{"orange", "banama", "dragonfruit", "ban"},
			[]bool{true, true, false, false},
		},
	}

	for _, test := range tests {
		trie := NewTrie()
		for _, w := range test.dict {
			trie.Insert(w)
		}
		for i, q := range test.queries {
			actual := trie.Search(q)
			expected := test.out[i]

			if actual != expected {
				t.Fatalf("Test failed. Expected: %v, Actual: %v\n", actual, expected)
			}
		}
	}
}
