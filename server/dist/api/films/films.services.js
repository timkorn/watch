"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilmFromWatchlist = exports.getWatchList = exports.addFilmToWatchlist = void 0;
const db_1 = __importDefault(require("../../utils/db"));
function addFilmToWatchlist(id, filmId) {
    return db_1.default.user.update({
        where: {
            id: id,
        },
        data: {
            watchlist: {
                push: String(filmId),
            },
        },
    });
}
exports.addFilmToWatchlist = addFilmToWatchlist;
function getWatchList(id) {
    return db_1.default.user.findUnique({
        where: {
            id: id,
        },
        select: {
            watchlist: true,
        },
    });
}
exports.getWatchList = getWatchList;
function deleteFilmFromWatchlist(id, filmId, films) {
    return db_1.default.user.update({
        where: {
            id: id,
        },
        data: {
            watchlist: {
                set: films.filter((film) => {
                    return film != filmId;
                }),
            },
        },
    });
}
exports.deleteFilmFromWatchlist = deleteFilmFromWatchlist;
