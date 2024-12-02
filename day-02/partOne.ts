import { assertEquals } from "@std/assert";
import { assertThrows } from "@std/assert/throws";

export enum Direction {
    INCREASING,
    DECREASING,
}

export type Transition = Direction | null;

export function partOne(input: string): number {
    const reports = input.trim().split("\n");

    let safeReports = 0;
    reports.forEach((report) => {
        const levels = report.split(" ").map(Number);

        if (isReportSafe(levels)) {
            safeReports += 1;
        }
    });

    return safeReports;
}

export function isReportSafe(levels: number[]) {
    const count = levels.length;
    const first = levels[0];
    const last = levels[count - 1];

    if (!inBounds(first, last, count)) {
        return false;
    }

    const direction = getDirection(first, last);

    return levels.every((level, i) => {
        if (i == count - 1) {
            return true;
        }
        const nextLevel = levels[i + 1];
        return isSafeTransition(level, nextLevel, direction);
    });
}

// A safe difference between levels is 1 <= d <= 3
// So total difference 1 * (count - 1) <= total d <= 3 * (count - 1)
export function inBounds(first: number, last: number, count: number): boolean {
    const lowerBound = count - 1;
    const upperBound = 3 * (count - 1);
    const totalDiff = Math.abs(first - last);

    return lowerBound <= totalDiff && totalDiff <= upperBound;
}

export function getDirection(first: number, last: number): Direction {
    if (first < last) {
        return Direction.INCREASING;
    } else if (first > last) {
        return Direction.DECREASING;
    } else {
        throw "Flat direction";
    }
}

export function getTransition(a: number, b: number) {
    const diff = b - a;
    if (diff >= 1 && diff <= 3) {
        return Direction.INCREASING;
    } else if (diff >= -3 && diff <= -1) {
        return Direction.DECREASING;
    } else {
        return null;
    }
}

export function isSafeTransition(a: number, b: number, direction: Direction) {
    const transition = getTransition(a, b);
    return transition != null && transition == direction;
}

// --- Tests ---

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const testSolution = 2;

Deno.test(function isSafeTransitionTest() {
    assertEquals(isSafeTransition(1, 2, Direction.INCREASING), true);
    assertEquals(isSafeTransition(1, 6, Direction.INCREASING), false);
    assertEquals(isSafeTransition(2, 1, Direction.INCREASING), false);
    assertEquals(isSafeTransition(2, 1, Direction.DECREASING), true);
});

Deno.test(function isReportSafeTest() {
    assertEquals(isReportSafe([7, 6, 4, 2, 1]), true);
    assertEquals(isReportSafe([1, 2, 7, 8, 9]), false);
    assertEquals(isReportSafe([1, 3, 6, 7, 9]), true);
});

Deno.test(function getDirectionTest() {
    assertEquals(getDirection(1, 2), Direction.INCREASING);
    assertEquals(getDirection(2, 1), Direction.DECREASING);
    assertThrows(() => {
        getDirection(1, 1);
    });
});

Deno.test(function inBoundsTest() {
    assertEquals(inBounds(1, 9, 5), true);
    assertEquals(inBounds(1, 3, 5), false);
});

Deno.test("Unsafe Transition", () => {
    assertEquals(getTransition(1, 1), null);
    assertEquals(getTransition(1, 5), null);
    assertEquals(getTransition(5, 1), null);
});

Deno.test("Safe Increase", () => {
    assertEquals(getTransition(1, 2), Direction.INCREASING);
    assertEquals(getTransition(1, 3), Direction.INCREASING);
    assertEquals(getTransition(1, 4), Direction.INCREASING);
});

Deno.test("Safe Decrease", () => {
    assertEquals(getTransition(4, 1), Direction.DECREASING);
    assertEquals(getTransition(3, 1), Direction.DECREASING);
    assertEquals(getTransition(2, 1), Direction.DECREASING);
});

Deno.test("Part 1", function solveTest() {
    assertEquals(partOne(testInput), testSolution);
});
