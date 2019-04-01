package commonchild

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"
)

// Complete the commonChild function below.
func commonChild(s1 string, s2 string) int32 {
	x := len(s1)
	y := len(s2)
	// we do this to zero out first row and column
	table := make([][]int32, y+1)
	for i := range table {
		table[i] = make([]int32, x+1)
	}

	// always add one, because the first row/column are the 'null' rows
	for row := 0; row < y; row++ {
		for col := 0; col < x; col++ {
			if s1[col] == s2[row] {
				table[row+1][col+1] = table[row][col] + 1
				continue
			}

			// no match
			left := table[row][col+1]
			top := table[row+1][col]

			if left > top {
				table[row+1][col+1] = left
			} else {
				table[row+1][col+1] = top
			}
		}
	}

	return table[x][y]
}

func main() {
	reader := bufio.NewReaderSize(os.Stdin, 1024*1024)

	stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
	checkError(err)

	defer stdout.Close()

	writer := bufio.NewWriterSize(stdout, 1024*1024)

	s1 := readLine(reader)

	s2 := readLine(reader)

	result := commonChild(s1, s2)

	fmt.Fprintf(writer, "%d\n", result)

	writer.Flush()
}

func readLine(reader *bufio.Reader) string {
	str, _, err := reader.ReadLine()
	if err == io.EOF {
		return ""
	}

	return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}
