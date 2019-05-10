package leetcode

import (
	"sort"
)

func findClosestElements(arr []int, k int, x int) []int {
	hi := len(arr)
	lo := -1
	mid := 0

	for lo+1 < hi {
		distance := hi - lo
		half := distance / 2
		mid = lo + half
		midVal := arr[mid]

		if midVal == x {
			break
		}

		// shift to lhs
		if midVal > x {
			hi = mid
		} else {
			lo = mid
		}
	}

	rem := k - 1
	left := mid - 1
	right := mid + 1
	res := []int{arr[mid]}

	for rem > 0 {
		// if left runs out, we just take from right
		if left < 0 {
			res = append(res, arr[right])
			right++
			rem--
			continue
		}

		// if right runs out, we just take from left
		if right > len(arr)-1 {
			res = append(res, arr[left])
			left--
			rem--
			continue
		}

		// if both have, take the left side, else right
		if x-arr[left] <= arr[right]-x {
			res = append(res, arr[left])
			left--
			rem--
		} else {
			res = append(res, arr[right])
			right++
			rem--
		}
	}

	sort.Ints(res)
	return res
}
