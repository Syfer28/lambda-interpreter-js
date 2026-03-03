import { parse } from './parser.js';

// Test case: (\x. x) y
const input = "(\\x. x) y";
try {
    const ast = parse(input);
    console.log("Successfully parsed AST:");
    console.log(JSON.stringify(ast, null, 2));
    console.log("String representation:", ast.toString());
} catch (e) {
    console.error("Parsing error:", e.message);
}