import { assertEquals } from "@std/assert";

export function partOne(input: string): number {
    const lines = input.trim().split("\n");

    const listA: number[] = [];
    const listB: number[] = [];

    for (let i = 0; i < lines.length; i++) {
        const [a, b] = lines[i].split("   ").map(Number);
        listA.push(a);
        listB.push(b);
    }

    listA.sort();
    listB.sort();

    let result = 0;

    for (let i = 0; i < listA.length; i++) {
        result += Math.abs(listA[i] - listB[i]);
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

const testSolution = 11;

Deno.test("Part 1", function solveTest() {
    assertEquals(partOne(testInput), testSolution);
});
