import { runCalculation } from '../dist/index.js';
import { median } from "./util.js";

const timing = [];

for (let i = 0; i < 100; i++) {
  timing.push(runCalculation());
}

console.log(`Execution median (100 runs): ${median(timing)}ms`);
