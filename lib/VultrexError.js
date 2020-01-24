"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VultrexError extends Error {
    constructor(error, name) {
        super();
        this.name = name || "VultrexError";
        this.message = error;
    }
}
exports.default = VultrexError;
