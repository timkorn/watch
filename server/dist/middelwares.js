"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAuthenticated(req, res, next) {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1].slice(0, -1);
    if (!accessToken) {
        res.status(401);
        throw new Error("🚫 Un-Authorized 🚫");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    }
    catch (err) {
        res.status(401);
        if (err.name === "TokenExpiredError") {
            throw new Error(err.name);
        }
        throw new Error("Un-Authorized");
    }
    return next();
}
exports.default = isAuthenticated;
