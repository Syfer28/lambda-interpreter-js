// Base class for all terms in the Lambda Calculus.
export class Term {
    toString() {
        throw new Error("toString() not implemented");
    }
}


// Represents a variable, e.g., 'x', 'y'.
export class Variable extends Term {
    constructor(name) {
        super();
        this.name = name;
    }
    toString() {
        return this.name;
    }
}


// Represents a lambda abstraction (function definition), e.g., λx. M
export class Abstraction extends Term {
    constructor(param, body) {
        super();
        this.param = param; // The name of the variable (string)
        this.body = body;   // The body of the function (Term)
    }
    toString() {
        return `(λ${this.param}. ${this.body.toString()})`;
    }
}


// Represents a function application, e.g., (M N)
export class Application extends Term {
    constructor(left, right) {
        super();
        this.left = left;  // The function being applied (Term)
        this.right = right; // The argument (Term)
    }
    toString() {
        return `(${this.left.toString()} ${this.right.toString()})`;
    }
}


// Represents constants like numbers or booleans (for Extended Lambda Calculus)
export class Literal extends Term {
    constructor(value) {
        super();
        this.value = value;
    }
    toString() {
        return String(this.value);
    }
}