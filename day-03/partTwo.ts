import { assertEquals } from "@std/assert";
import { partOne } from "./partOne.ts";

// We can create an input that just contains the relevant instructions.
// When we are in a do mode, we add all isntructions until a don't()
// When we are in a don't mode, we ignore instructions until a do()
// Then we can just use part 1.

type Mode = `do()` | `don't()`;

function filterOutIgnoredInstructions(input: string): string {
    let currentIndex = 0;
    let mode: Mode = `do()`;
    const output: string[] = [];
    while (currentIndex < input.length) {
        if (mode == `do()`) {
            const ndx = input.indexOf(`don't()`, currentIndex);
            if (ndx < 0) {
                output.push(input.substring(currentIndex));
                break;
            }
            output.push(input.substring(currentIndex, ndx));
            currentIndex = ndx + `don't()`.length;
            mode = `don't()`;
        } else {
            const ndx = input.indexOf(`do()`, currentIndex);
            if (ndx < 0) {
                break;
            }
            currentIndex = ndx + `do()`.length;
            mode = `do()`;
        }
    }
    return output.join(" ");
}

export function partTwo(input: string): number {
    return partOne(filterOutIgnoredInstructions(input));
}

// --- Tests ---

const testInput =
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const testSolution = 48;

Deno.test("Part 2", function solveTest() {
    assertEquals(partTwo(testInput), testSolution);
});

Deno.test("Filter Input", function test() {
    assertEquals(
        filterOutIgnoredInstructions(testInput),
        `xmul(2,4)&mul[3,7]!^ ?mul(8,5))`,
    );
});
