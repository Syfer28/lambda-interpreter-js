import { Variable, Abstraction, Application, Literal } from './ast.js';

// Basic tokenizer
class Tokenizer {
    constructor(input) {
        this.input = input;
        this.pos = 0;
    }

    tokenize() {
        const tokens = [];
        const regex = /\s*([λ\\]|[.()]|[a-z][a-z0-9]*|[0-9]+)\s*/g;
        let match;
        while ((match = regex.exec(this.input)) !== null) {
            tokens.push(match[1]);
        }
        return tokens;
    }
}

// Recursive Descent Parser
export class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.pos = 0;
    }

    peek() { return this.tokens[this.pos]; }
    consume() { return this.tokens[this.pos++]; }

    parseTerm() {
        let term = this.parsePrimary();
        // while there is a next token and its not a closing parenthesis or dot
        while (this.peek() && this.peek() !== ')' && this.peek() !== '.') {
            const next = this.parsePrimary();
            term = new Application(term, next);
        }
        return term;
    }

    parsePrimary() {
        const token = this.consume();

        if (token === '(') {
            const term = this.parseTerm();
            this.consume(); // consume ')'
            return term;
        }

        if (token === '\\' || token === 'λ') {
            const param = this.consume();
            this.consume(); // consume '.'
            const body = this.parseTerm();
            return new Abstraction(param, body);
        }

        if (/^[0-9]+$/.test(token)) {
            return new Literal(parseInt(token, 10));
        }

        return new Variable(token);
    }
}

export function parse(input) {
    const tokens = new Tokenizer(input).tokenize();
    return new Parser(tokens).parseTerm();
}