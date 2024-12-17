import { assertEquals } from "@std/assert";

// JS Doesn't have a char type.
// Input is an array of characters
// 0 1 2
// 3 4 5
// 6 7 8
//
// To be valid, 4 must be A
// 0 and 9 must be M or S but not the same
// And same for 2 and 7

function matchX_MAS(input: string) {
    if (input[4] !== "A") {
        return false;
    }

    const isMorS = (c: string) => c === "M" || c === "S";

    // 0 and 8 must be M or S but not the same
    if (!(isMorS(input[0]) && isMorS(input[8]) && input[0] !== input[8])) {
        return false;
    }

    // And same for 2 and 6
    if (!(isMorS(input[2]) && isMorS(input[6]) && input[2] !== input[6])) {
        return false;
    }

    return true;
}

// Create a 2D grid of all characters

export function partTwo(input: string): number {
    const lines = input.trim().split("\n");
    const size = lines.length;

    let count = 0;

    // Use a neighbourhood search
    for (let i = 1; i < size - 1; i++) {
        for (let j = 1; j < size - 1; j++) {
            if (lines[i][j] !== "A") {
                continue;
            }

            const xmas = [
                lines[i - 1][j - 1],
                lines[i - 1][j],
                lines[i - 1][j + 1],
                lines[i][j - 1],
                lines[i][j],
                lines[i][j + 1],
                lines[i + 1][j - 1],
                lines[i + 1][j],
                lines[i + 1][j + 1],
            ].join("");

            if (matchX_MAS(xmas)) {
                count += 1;
            }
        }
    }

    return count;
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

const testSolution = 9;

const validX_MAS1 = `
M.M
.A.
S.S`.replaceAll("\n", "");

const validX_MAS2 = `
M.S
.A.
M.S`.replaceAll("\n", "");

Deno.test("Part 2", function solveTest() {
    assertEquals(partTwo(testInput), testSolution);
});

Deno.test("Valid XMAS 1", function test() {
    assertEquals(matchX_MAS(validX_MAS1), true);
});

Deno.test("Valid XMAS 2", function test() {
    assertEquals(matchX_MAS(validX_MAS2), true);
});
