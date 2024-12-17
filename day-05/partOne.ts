import { assertEquals } from "@std/assert";

// The first part is the rules.
// 45|92 means if 45 and 92 are in the update
// then 45 must be before 92
//
// An update is true if:
// - it has correct rules for all pairs
// - and doesn't have contrasting rules (not sure if I need to check this)
//
//
// e.g. update: a,b,c,d
// is valid if,
// the rules contain: a|b, a|c, a|d, b|c, b|d and c|d
// the rules don't contain: b|a, c|a, d|a, c|b, d|b, d|c

export function partOne(input: string): number {
    const [rulesInput, updatesInput] = input.trim().split("\n\n");

    const rules = new Set(rulesInput.split("\n"));

    return updatesInput.split("\n")
        .map((updateLine) => updateLine.split(","))
        .map((pages) => ({
            value: Number(pages[Math.floor(pages.length / 2)]), // get middle number
            isValid: pages.every((_, index) =>
                pageIsValid(pages, index, rules)
            ),
        }))
        .filter((d) => d.isValid)
        .reduce((acc, el) => acc + el.value, 0);
}

export function pageIsValid(
    pages: string[],
    index: number,
    rules: Set<string>,
) {
    let reqs = satisfyingRequirements(pages, index);
    const satisfied = reqs.every((r) => rules.has(r));

    reqs = contradictingRequirements(pages, index);
    const contradiction = reqs.some((r) => rules.has(r));

    return satisfied && !contradiction;
}

function satisfyingRequirements(pages: string[], index: number) {
    return pages.slice(index + 1).map((p) => `${pages[index]}|${p}`);
}
function contradictingRequirements(pages: string[], index: number) {
    return pages.slice(index + 1).map((p) => `${p}|${pages[index]}`);
}

Deno.test("Satisfying requirements", () => {
    assertEquals(
        satisfyingRequirements(["a", "b", "c", "d"], 0),
        ["a|b", "a|c", "a|d"],
    );
});

Deno.test("Contrasting Requirements", () => {
    assertEquals(
        contradictingRequirements(["a", "b", "c", "d"], 0),
        ["b|a", "c|a", "d|a"],
    );
});

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

const testSolution = 143;

Deno.test("Part 1", function solveTest() {
    assertEquals(partOne(testInput), testSolution);
});
