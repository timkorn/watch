"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserByEmailAndPassword = exports.findUserById = exports.findUserByEmail = void 0;
const bcrypt = require("bcrypt");
const db_1 = __importDefault(require("../../utils/db"));
function findUserByEmail(email) {
    return db_1.default.user.findUnique({
        where: {
            email,
        },
    });
}
exports.findUserByEmail = findUserByEmail;
function createUserByEmailAndPassword(user) {
    user.password = bcrypt.hashSync(user.password, 12);
    return db_1.default.user.create({
        data: user,
    });
}
exports.createUserByEmailAndPassword = createUserByEmailAndPassword;
function findUserById(id) {
    return db_1.default.user.findUnique({
        where: {
            id,
        },
    });
}
exports.findUserById = findUserById;
