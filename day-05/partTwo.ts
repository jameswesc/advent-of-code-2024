import { assertEquals } from "@std/assert";
import { pageIsValid } from "./partOne.ts";

export function partTwo(input: string): number {
    const [rulesInput, updatesInput] = input.trim().split("\n\n");

    const rules = new Set(rulesInput.split("\n"));

    return updatesInput.split("\n")
        .map((updateLine) => updateLine.split(","))
        .filter((pages) =>
            !pages.every((_, index) => pageIsValid(pages, index, rules))
        )
        .map((pages) =>
            pages.sort((a, b) => {
                if (rules.has(`${a}|${b}`)) {
                    return -1;
                } else if (rules.has(`${b}|${a}`)) {
                    return 1;
                } else {
                    return 0;
                }
            })
        )
        .map((pages) => Number(pages[Math.floor(pages.length / 2)]))
        .reduce((a, b) => a + b);
}

// --- Tests ---

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const testSolution = 123;

Deno.test("Part 2", function solveTest() {
    assertEquals(partTwo(testInput), testSolution);
});
