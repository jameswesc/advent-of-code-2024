import { partOne } from "./partOne.ts";
import { partTwo } from "./partTwo.ts";

const input = Deno.readTextFileSync("input.txt");

Deno.bench("Day 02 - Part 1", () => {
    partOne(input);
});

Deno.bench("Day 02 - Part 2", () => {
    partTwo(input);
});
