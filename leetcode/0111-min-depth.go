package leetcode

import (
	"math"
)

func minDepth(root *TreeNode) int {
	min := math.MaxInt64
	nodes := []*TreeNode{root}
	depths := map[*TreeNode]int{root: 1}
	ancestors := map[*TreeNode]*TreeNode{root: nil}

	if root == nil {
		return 0
	}

	// get neighbours and add them to the queue
	for len(nodes) > 0 {
		v := nodes[0]
		nodes = nodes[1:]

		if v.Left == nil && v.Right == nil {
			depth := depths[v]
			if depth < min {
				min = depth
			}
			continue
		}

		if v.Left != nil {
			nodes = append(nodes, v.Left)
			depths[v.Left] = depths[v] + 1
			ancestors[v.Left] = v
		}

		if v.Right != nil {
			nodes = append(nodes, v.Right)
			depths[v.Right] = depths[v] + 1
			ancestors[v.Right] = v
		}
	}

	return min
}
