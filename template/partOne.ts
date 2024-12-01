import { assertEquals } from "@std/assert";

type ParsedInput = {};

function parseInput(input: string): ParsedInput {
    return null as unknown as ParsedInput;
}

function solve(input: ParsedInput): number {
    return 0;
}

function main() {
    const input = Deno.readTextFileSync("input.txt");
    const parsedInput = parseInput(input);
    const solution = solve(parsedInput);
    return solution;
}

if (import.meta.main) {
    const solution = main();
    console.log(solution);
}

// --- Tests ---

const testInput = ``;

const parsedTestInput = {};

const testSolution = 1;

Deno.test("Part One Input", function parseInputTest() {
    assertEquals(parseInput(testInput), parsedTestInput);
});

Deno.test("Part One Solve", function solveTest() {
    assertEquals(solve(parsedTestInput), testSolution);
});

// --- Bench ---

Deno.bench("Part One", { permissions: { read: true } }, () => {
    main();
});
