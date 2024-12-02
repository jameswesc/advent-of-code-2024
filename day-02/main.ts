import { partOne } from "./partOne.ts";
import { partTwo } from "./partTwo.ts";

const input = Deno.readTextFileSync("input.txt");

console.log("Part 1:", partOne(input));
console.log("Part 2:", partTwo(input));
