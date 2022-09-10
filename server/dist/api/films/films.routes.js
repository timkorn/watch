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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const films_services_1 = require("./films.services");
const filmRouter = express_1.default.Router();
const API_KEY = process.env.KINO;
const endpoints = {
    globalSearch: `/v2.1/films/search-by-keyword?keyword=`,
    mainInfo: `/v2.2/films/`,
    staff: `/v1/staff?filmId=`,
};
axios_1.default.defaults.baseURL = `https://kinopoiskapiunofficial.tech/api`;
axios_1.default.defaults.headers.common["X-API-KEY"] = API_KEY;
filmRouter.post("/search", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.body.search;
        const userId = req.body.userId;
        const result = yield axios_1.default.get(endpoints.globalSearch + search);
        const films = result.data.films;
        const watchlist = yield (0, films_services_1.getWatchList)(userId);
        films.forEach((item, index, array) => {
            if (watchlist.watchlist.includes(String(item.filmId))) {
                array[index].chosen = true;
            }
            else {
                array[index].chosen = false;
            }
        });
        res.json({ films });
    }
    catch (err) {
        next(err);
    }
}));
filmRouter.post("/mainInfo/:filmId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filmId = req.params.filmId;
        const userId = req.body.userId;
        const watchlist = yield (0, films_services_1.getWatchList)(userId);
        const result = yield axios_1.default.get(endpoints.mainInfo + filmId);
        const film = result.data;
        if (watchlist === null || watchlist === void 0 ? void 0 : watchlist.watchlist.includes(String(film.kinopoiskId))) {
            film.chosen = true;
        }
        else {
            film.chosen = false;
        }
        res.json(film);
    }
    catch (err) {
        next(err);
    }
}));
filmRouter.get("/getstaff/:filmId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filmId = req.params.filmId;
        const result = yield axios_1.default.get(endpoints.staff + filmId);
        const actors = result.data;
        res.json({ actors: [actors[0], actors[1], actors[2], actors[3]] });
    }
    catch (err) {
        next(err);
    }
}));
filmRouter.post("/setFilmToWatchlist", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const filmId = req.body.filmId;
        const films = yield (0, films_services_1.getWatchList)(userId);
        if (films.watchlist.length > 4) {
            res.send(429);
            throw new Error("Limit of watchlist");
        }
        if (!(films === null || films === void 0 ? void 0 : films.watchlist.includes(filmId))) {
            yield (0, films_services_1.addFilmToWatchlist)(userId, filmId);
        }
        res.send(200);
    }
    catch (err) {
        next(err);
    }
}));
filmRouter.post("/getWatchlist", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const films = yield (0, films_services_1.getWatchList)(userId);
        const filmsData = yield axios_1.default
            .all(films.watchlist.map((item) => axios_1.default.get(endpoints.mainInfo + item)))
            .then(axios_1.default.spread((...res) => {
            return res.map((item) => {
                item.data.chosen = true;
                return item.data;
            });
        }));
        res.json({ filmsData });
    }
    catch (err) {
        next(err);
    }
}));
filmRouter.post("/deleteFromWatchlist", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const filmId = req.body.filmId;
        const films = yield (0, films_services_1.getWatchList)(userId);
        yield (0, films_services_1.deleteFilmFromWatchlist)(userId, filmId, films.watchlist);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = filmRouter;
