package leetcode

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func rangeSumBST(root *TreeNode, L int, R int) int {
	nodes := []*TreeNode{}
	nodes = append(nodes, root)
	sum := 0

	for len(nodes) != 0 {
		node := nodes[len(nodes)-1]
		nodes = nodes[:len(nodes)-1]

		if node.Left != nil {
			nodes = append(nodes, node.Left)
		}

		if node.Right != nil {
			nodes = append(nodes, node.Right)
		}

		if node.Val >= L && node.Val <= R {
			sum += node.Val
		}
	}

	return sum
}
