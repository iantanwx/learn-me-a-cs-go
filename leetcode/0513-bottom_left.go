package leetcode

func findBottomLeftValue(root *TreeNode) int {
	q := []*TreeNode{root}
	var curr *TreeNode

	for len(q) > 0 {
		curr = q[0]
		q = q[1:]

		if curr.Right != nil {
			q = append(q, curr.Right)
		}

		if curr.Left != nil {
			q = append(q, curr.Left)
		}
	}

	return curr.Val
}
