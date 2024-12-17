import { assertArrayIncludes, assertEquals } from "@std/assert";

// Input is like a grid. Say 10 x 10c
// Basic solution would be to create all
// possible strings and search through them
// That is:
// 2 x 10 x 10c - horizontal forward and back
// 2 x 10 x 10c - vertical forward and back
// 2- diagonal 1, forard and back (more)
// 2 x (2x10 - 1) x 10c - diagonal 2, foward and back (more)
// New search space is only 8 times as large
//
// 1

// We don't need to actually create the backwards
// ones, we can just search for SAMX. So ends up as
// 4 times

export function partOne(input: string): number {
    const searchStrings = createSearchStrings(input);

    let count = 0;

    searchStrings.forEach((line) => {
        const forwardMatches = [...line.matchAll(/XMAS/g)];
        const backwardMatches = [...line.matchAll(/SAMX/g)];

        count += forwardMatches.length;
        count += backwardMatches.length;
    });

    return count;
}

// Convert from a single list of strings to
// lists for rows, cols, downwards and upwards
// where downwards goes from top left to
// botom right, and upwars bottom left to top right
function createSearchStrings(input: string) {
    const lines = input.trim().split("\n");

    const size = lines.length;

    const searchStrings: string[] = [];

    for (let i = 0; i < size; i++) {
        let row = "";
        let col = "";

        let upwardsTop = "";
        let upwardsBottom = "";

        let downwardsTop = "";
        let downwardsBottom = "";

        for (let j = 0; j < size; j++) {
            row += lines[i][j];
            col += lines[j][i];

            if (i - j >= 0) {
                upwardsTop += lines[i - j][j];
            }
            if (i + size - j < size) {
                upwardsBottom += lines[i + size - j][j];
            }
            if (i + j < size) {
                downwardsBottom += lines[i + j][j];
            }
            if (i - size + j >= 0) {
                downwardsTop += lines[i - size + j][j];
            }
        }
        searchStrings.push(row);
        searchStrings.push(col);
        if (upwardsTop !== "") {
            searchStrings.push(upwardsTop);
        }
        if (upwardsBottom !== "") {
            searchStrings.push(upwardsBottom);
        }
        if (downwardsTop !== "") {
            searchStrings.push(downwardsTop);
        }
        if (downwardsBottom !== "") {
            searchStrings.push(downwardsBottom);
        }
    }

    return searchStrings;
}

// --- Tests ---

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const testSolution = 18;

Deno.test("Part 1", function solveTest() {
    assertEquals(partOne(testInput), testSolution);
});

const searchStringsTestInput = `
123
456
789`;

const searchStringTestOutput = {
    rows: ["123", "456", "789"],
    cols: ["147", "258", "369"],
    upwards: ["1", "42", "753", "86", "9"],
    downwards: ["7", "48", "159", "26", "3"],
};

Deno.test("Includes Rows", function test() {
    const output = createSearchStrings(searchStringsTestInput);
    assertArrayIncludes(output, searchStringTestOutput.rows);
});
Deno.test("Includes Cols", function test() {
    const output = createSearchStrings(searchStringsTestInput);
    assertArrayIncludes(output, searchStringTestOutput.cols);
});
Deno.test("Includes upwards diagonals", function test() {
    const output = createSearchStrings(searchStringsTestInput);
    assertArrayIncludes(output, searchStringTestOutput.upwards);
});
Deno.test("Includes downards diagonals", function test() {
    const output = createSearchStrings(searchStringsTestInput);
    assertArrayIncludes(output, searchStringTestOutput.downwards);
});
Deno.test("Doesn't include extras", function test() {
    const output = createSearchStrings(searchStringsTestInput);
    assertEquals(
        output.length,
        searchStringTestOutput.rows.length +
            searchStringTestOutput.cols.length +
            searchStringTestOutput.upwards.length +
            searchStringTestOutput.downwards.length,
    );
});
