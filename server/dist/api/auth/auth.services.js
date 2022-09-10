"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeTokens = exports.deleteRefreshToken = exports.findRefreshTokenById = exports.addRefreshTokenToWhitelist = void 0;
const db_1 = __importDefault(require("../../utils/db"));
const hashToken_1 = __importDefault(require("../../utils/hashToken"));
// used when we create a refresh token.
function addRefreshTokenToWhitelist({ jti, refreshToken, userId, }) {
    return db_1.default.refreshToken.create({
        data: {
            id: jti,
            hashedToken: (0, hashToken_1.default)(refreshToken),
            userId,
        },
    });
}
exports.addRefreshTokenToWhitelist = addRefreshTokenToWhitelist;
// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id) {
    return db_1.default.refreshToken.findUnique({
        where: {
            id,
        },
    });
}
exports.findRefreshTokenById = findRefreshTokenById;
// soft delete tokens after usage.
function deleteRefreshToken(id) {
    return db_1.default.refreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true,
        },
    });
}
exports.deleteRefreshToken = deleteRefreshToken;
function revokeTokens(userId) {
    return db_1.default.refreshToken.updateMany({
        where: {
            userId,
        },
        data: {
            revoked: true,
        },
    });
}
exports.revokeTokens = revokeTokens;
