# Extended Lambda Calculus Interpreter

This is a functional interpreter for the Lambda Calculus implemented in JavaScript (Node.js).

## Features
- Recursive Descent Parser: Converts string input into an Abstract Syntax Tree (AST).
- Beta-reduction: Supports stepwise reduction of lambda terms.
- Alpha-conversion: Implements capture-avoiding substitution to ensure correct variable binding.
- Step-by-step Evaluation: Displays every reduction step from the initial term to the normal form.

## Project Structure
- `ast.js`: Definitions of Term classes (Variable, Abstraction, Application).
- `parser.js`: Tokenizer and Parser logic.
- `evaluator.js`: Reduction engine and substitution algorithms.
- `index.js`: Entry point for console testing.

## How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone [https://github.com/Syfer28/lambda-interpreter-js.git](https://github.com/Syfer28/lambda-interpreter-js.git)

2. Navigate to the project folder:
    cd lambda-interpreter-js

3. Run the interpreter:
    node index.js

### Usage
The interpreter accepts lambda terms in the following format:
    Lambda abstraction: \x. x or λx. x
    Application: (M N)
    Example: (\x. \y. x) a b