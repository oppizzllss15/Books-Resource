"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = void 0;
// generate a secret key to use with JWT for logging in.
function secretKey() {
    const key = [...Array(30)]
        .map((n) => ((Math.random() * 36) | 0).toString(36))
        .join("");
    return key;
}
exports.secretKey = secretKey;
