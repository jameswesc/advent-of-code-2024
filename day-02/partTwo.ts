import { assertEquals } from "@std/assert";
import { isReportSafe } from "./partOne.ts";

// In the end I brute forced it. However, the brute force was still really quick.
// Lesson to be learnt: Just try a brute force first to see if it works?
// I'm just benching time, would be good to bench memory as well

export function partTwo(input: string): number {
    const reports: number[][] = input.trim().split("\n")
        .map((line) => line.split(" ").map(Number));

    let safeReports = 0;

    reports.forEach((levels) => {
        const allLevels = [];
        allLevels.push([...levels]);

        for (let i = 0; i < levels.length; i++) {
            const newLevels = [...levels];
            newLevels.splice(i, 1);
            allLevels.push(newLevels);
        }

        const isASafeReport = allLevels.some((levels) => isReportSafe(levels));

        if (isASafeReport) {
            safeReports += 1;
        }
    });

    return safeReports;
}

// --- Tests ---

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const testSolution = 4;

Deno.test("Part 2", function solveTest() {
    assertEquals(partTwo(testInput), testSolution);
});
