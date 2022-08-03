"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareSync = void 0;
const slice = Array.prototype.slice;
function middlewareSync() {
    const stacks = slice.call(arguments);
    var arg = 0;
    var params = [];
    var return_values = [];
    if (!stacks.length) {
        throw new Error("There is no any arguments.");
    }
    for (let i = 0; i < stacks.length; i++) {
        if (typeof stacks[i] !== "function") {
            throw new Error(`Arguments ${i + 1} is not a Function. All arguments have to be a Function.`);
        }
    }
    return function () {
        params = slice.call(arguments);
        function returns() {
            return_values = slice.call(arguments);
        }
        let new_params = [];
        if (params[arg] !== undefined) {
            new_params.push(params[arg]);
        }
        stacks[arg].apply(this, [...new_params, next, returns]);
        function next() {
            const new_args = slice.call(arguments);
            arg++;
            let new_params = [];
            new_params.push(...new_args);
            if (params[arg] !== undefined) {
                new_params.push(params[arg]);
            }
            stacks[arg].apply(this, [...new_params, next, returns]);
        }
        return return_values.length ? return_values : undefined;
    };
}
exports.middlewareSync = middlewareSync;
//# sourceMappingURL=middlewareSync.js.map