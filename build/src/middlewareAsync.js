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
function middlewareAsync(...[]) {
    const slice = Array.prototype.slice;
    const stacks = slice.call(arguments);
    const that = this;
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
            var arg = 0;
            var return_values = [];
            const params = slice.call(arguments);
            function returns() {
                return_values = slice.call(arguments);
                return return_values;
            }
            function next() {
                return __awaiter(this, arguments, void 0, function* () {
                    arg++;
                    const new_args = slice.call(arguments);
                    yield stacks[arg].apply(that, [...new_args, params[arg], next, returns]);
                });
            }
            yield stacks[arg].apply(that, [params[arg], next, returns]);
            return return_values.length ? return_values : undefined;
        });
    };
}
exports.middlewareAsync = middlewareAsync;
//# sourceMappingURL=middlewareAsync.js.map