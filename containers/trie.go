package containers

// TrieNode represents a subtree in the trie
type TrieNode struct {
	Data     byte
	IsEnd    bool
	Children [26]*TrieNode
}

// Trie represents a set of words
type Trie struct {
	Root *TrieNode
}

// Insert inserts a word into our Trie
// NOTE: this only works on ASCII set.
func (t *Trie) Insert(word string) error {
	curr := t.Root
	wordLen := len(word)
	// interate for length of the string
	for i := 0; i < wordLen; i++ {
		char := word[i]
		charIdx := charToIndex(char)
		n := curr.Children[charIdx]
		// not in the trie
		if n == nil {
			newNode := NewTrieNode()
			newNode.Data = char
			if i == wordLen-1 {
				newNode.IsEnd = true
			}

			curr.Children[charIdx] = newNode
			curr = newNode
			continue
		}

		// in the trie
		curr = n
	}

	return nil
}

// Search finds a word in our Trie (if it exists)
// To solve this specific problem we only allow a maximum edit distance of 1
// In the real world it should probably be more tolerant than that.
func (t *Trie) Search(word string) bool {
	curr := t.Root
	wordLen := len(word)
	dist := 0

	for i := 0; i < wordLen; i++ {
		char := word[i]
		charIdx := charToIndex(char)
		n := curr.Children[charIdx]

		// we could not find the currentt character.
		if n == nil {
			if dist > 1 {
				return false
			}

			// we are still within the threshold. search in the next level.
			for _, c := range curr.Children {
				if c != nil && c.Children[charIdx] != nil {
					curr = c.Children[charIdx]
					break
				}
			}

			dist++
			continue
		}

		curr = n
	}

	// Should check if it's an actual word
	if curr.IsEnd == false {
		return false
	}

	return true
}

// NewTrieNode creates a new empty trie node
func NewTrieNode() *TrieNode {
	return &TrieNode{
		Data:  byte(0),
		IsEnd: false,
	}
}

// NewTrie initialises a new empty trie
func NewTrie() *Trie {
	root := NewTrieNode()
	return &Trie{root}
}

func charToIndex(char byte) int {
	return int(char - byte("a"[0]))
}
