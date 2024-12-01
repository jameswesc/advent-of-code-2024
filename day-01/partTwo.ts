import { assertEquals } from "@std/assert";

export function partTwo(input: string): number {
    const lines = input.trim().split("\n");

    // Left list is still a regular list
    const leftList: number[] = [];

    // Right list is a count of occurences for that number
    // key = number, value = occurences
    const rightList: Map<number, number> = new Map();

    for (let i = 0; i < lines.length; i++) {
        const [a, b] = lines[i].split("   ").map(Number);

        leftList.push(a);

        const bCount = rightList.get(b);
        rightList.set(b, 1 + (bCount ?? 0));
    }

    let result = 0;

    for (let i = 0; i < leftList.length; i++) {
        const num = leftList[i];
        const occurences = rightList.get(num) ?? 0;

        result += num * occurences;
    }

    return result;
}

// --- Tests ---

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

const testSolution = 31;

Deno.test("Part 2", function solveTest() {
    assertEquals(partTwo(testInput), testSolution);
});
