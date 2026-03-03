import { Variable, Abstraction, Application, Literal } from './ast.js';

// Evaluator for lambda calculus terms.
export class Evaluator {
    constructor() {
        this.stepLog = [];
    }

    /**
     * finds all free variables in a term.
     * @param {Term} term 
     * @param {Set} bound 
     */
    getFreeVars(term, bound = new Set()) {
        if (term instanceof Variable) {
            if (!bound.has(term.name)) return new Set([term.name]);
            return new Set();
        }
        if (term instanceof Abstraction) {
            const newBound = new Set(bound);
            newBound.add(term.param);
            return this.getFreeVars(term.body, newBound);
        }
        if (term instanceof Application) {
            const leftFree = this.getFreeVars(term.left, bound);
            const rightFree = this.getFreeVars(term.right, bound);
            return new Set([...leftFree, ...rightFree]);
        }
        return new Set();
    }

    // Substitution: M[x := N] (Replace x with N in term M)
    substitute(M, x, N) {
        if (M instanceof Variable) {
            return M.name === x ? N : M;
        }
        if (M instanceof Abstraction) {
            // if the parameter is the same as the variable to replace, stop
            if (M.param === x) return M;

            // to avoid variable capture, we could implement alpha-conversion here
            // for now, assume unique names or simple substitution
            return new Abstraction(M.param, this.substitute(M.body, x, N));
        }
        if (M instanceof Application) {
            return new Application(
                this.substitute(M.left, x, N),
                this.substitute(M.right, x, N)
            );
        }
        return M;
    }

    // Performs a single step of Normal Order Reduction.
    reduceStep(term) {
        if (term instanceof Application) {
            // case: (λx. M) N  =>  M[x := N]
            if (term.left instanceof Abstraction) {
                return this.substitute(term.left.body, term.left.param, term.right);
            }

            // try to reduce the left side first
            const newLeft = this.reduceStep(term.left);
            if (newLeft !== term.left) return new Application(newLeft, term.right);

            // if left is fully reduced, try the right side
            const newRight = this.reduceStep(term.right);
            if (newRight !== term.right) return new Application(term.left, newRight);
        }

        if (term instanceof Abstraction) {
            const newBody = this.reduceStep(term.body);
            if (newBody !== term.body) return new Abstraction(term.param, newBody);
        }

        return term; // no reduction possible
    }

    // Fully evaluates a term and logs each step.
    evaluate(term) {
        let current = term;
        this.stepLog = [current.toString()];

        let limit = 100; // prevent infinite loops
        while (limit-- > 0) {
            let next = this.reduceStep(current);
            if (next.toString() === current.toString()) break;
            current = next;
            this.stepLog.push(current.toString());
        }

        return current;
    }
}