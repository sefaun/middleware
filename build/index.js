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
exports.middlewareAsync = exports.middlewareSync = void 0;
function middlewareSync() {
    var slice = Array.prototype.slice;
    var stack = slice.call(arguments);
    var arg = 0;
    if (!stack.length) {
        throw new Error("Not Found Any Function");
    }
    function next() {
        var new_args = slice.call(arguments);
        arg++;
        if (stack.length <= arg) {
            throw new Error("No Function To Next");
        }
        stack[arg].apply(this, [...new_args, next]);
    }
    stack[arg].apply(this, [next]);
}
exports.middlewareSync = middlewareSync;
function middlewareAsync() {
    return __awaiter(this, arguments, void 0, function* () {
        var slice = Array.prototype.slice;
        var stack = slice.call(arguments);
        var arg = 0;
        var that = this;
        if (!stack.length) {
            throw new Error("Not Found Any Function");
        }
        yield new Promise((_resolve, _reject) => {
            function next() {
                var new_args = slice.call(arguments);
                arg++;
                if (stack.length <= arg) {
                    throw new Error("No Function To Next");
                }
                stack[arg].apply(that, [...new_args, next]);
            }
            stack[arg].apply(that, [next]);
        });
    });
}
exports.middlewareAsync = middlewareAsync;
//# sourceMappingURL=index.js.map