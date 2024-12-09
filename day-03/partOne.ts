import { assertEquals } from "@std/assert";

export function partOne(input: string): number {
    return extractMuls(input).reduce((acc, val) => acc + val[0] * val[1], 0);
}

function extractMuls(input: string): [number, number][] {
    const matches = input.matchAll(/mul\((\d{1,3})\,(\d{1,3})\)/g);
    return [...matches].map((d) => [Number(d[1]), Number(d[2])]);
}

// --- Tests ---

const testInput =
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

const testSolution = 161;

Deno.test("Part 1", function solveTest() {
    assertEquals(partOne(testInput), testSolution);
});

Deno.test(function extractMulsTest() {
    assertEquals(
        extractMuls(testInput),
        [
            [2, 4],
            [5, 5],
            [11, 8],
            [8, 5],
        ],
    );
});
