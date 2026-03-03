import { parse } from './parser.js';
import { Evaluator } from './evaluator.js';

const input = "(\\x. \\y. x) a b"; // standard K-combinator test
const ast = parse(input);
const evaler = new Evaluator();

console.log("Starting reduction for:", input);
evaler.evaluate(ast);

evaler.stepLog.forEach((step, index) => {
    console.log(`Step ${index}: ${step}`);
});