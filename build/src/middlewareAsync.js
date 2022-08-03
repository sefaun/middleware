"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareAsync = void 0;
const slice = Array.prototype.slice;
function middlewareAsync() {
    const stacks = slice.call(arguments);
    const that = this;
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
        return __awaiter(this, arguments, void 0, function* () {
            params = slice.call(arguments);
            function returns() {
                return_values = slice.call(arguments);
            }
            let new_params = [];
            if (params[arg] !== undefined) {
                new_params.push(params[arg]);
            }
            yield stacks[arg].apply(that, [...new_params, next, returns]);
            function next() {
                return __awaiter(this, arguments, void 0, function* () {
                    const new_args = slice.call(arguments);
                    arg++;
                    let new_params = [];
                    new_params.push(...new_args);
                    if (params[arg] !== undefined) {
                        new_params.push(params[arg]);
                    }
                    yield stacks[arg].apply(that, [...new_params, next, returns]);
                });
            }
            return return_values.length ? return_values : undefined;
        });
    };
}
exports.middlewareAsync = middlewareAsync;
//# sourceMappingURL=middlewareAsync.js.map