import express from "express";
import axios from "axios";
import {
  addFilmToWatchlist,
  deleteFilmFromWatchlist,
  getWatchList,
} from "./films.services";
const filmRouter = express.Router();
const API_KEY: string = process.env.KINO!;
const endpoints = {
  globalSearch: `/v2.1/films/search-by-keyword?keyword=`,
  mainInfo: `/v2.2/films/`,
  staff: `/v1/staff?filmId=`,
};
axios.defaults.baseURL = `https://kinopoiskapiunofficial.tech/api`;
axios.defaults.headers.common["X-API-KEY"] = API_KEY;
filmRouter.post("/search", async (req, res, next) => {
  try {
    const search: string = req.body.search;
    const userId: string = req.body.userId;
    const result = await axios.get(endpoints.globalSearch + search);
    const films = result.data.films;
    const watchlist = await getWatchList(userId);
    films.forEach((item: any, index: number, array: any[]) => {
      if (watchlist!.watchlist.includes(String(item.filmId))) {
        array[index].chosen = true;
      } else {
        array[index].chosen = false;
      }
    });
    res.json({ films });
  } catch (err) {
    next(err);
  }
});
filmRouter.post("/mainInfo/:filmId", async (req, res, next) => {
  try {
    const filmId = req.params.filmId;
    const userId: string = req.body.userId;
    const watchlist = await getWatchList(userId);
    const result = await axios.get(endpoints.mainInfo + filmId);
    const film = result.data;
    if (watchlist?.watchlist.includes(String(film.kinopoiskId))) {
      film.chosen = true;
    } else {
      film.chosen = false;
    }
    res.json(film);
  } catch (err) {
    next(err);
  }
});
filmRouter.get("/getstaff/:filmId", async (req, res, next) => {
  try {
    const filmId = req.params.filmId;
    const result = await axios.get(endpoints.staff + filmId);
    const actors = result.data;
    res.json({ actors: [actors[0], actors[1], actors[2], actors[3]] });
  } catch (err) {
    next(err);
  }
});
filmRouter.post("/setFilmToWatchlist", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const filmId = req.body.filmId;
    const films = await getWatchList(userId);
    if (films!.watchlist.length > 4) {
      res.send(429);
      throw new Error("Limit of watchlist");
    }
    if (!films?.watchlist.includes(filmId)) {
      await addFilmToWatchlist(userId, filmId);
    }
    res.send(200);
  } catch (err) {
    next(err);
  }
});
filmRouter.post("/getWatchlist", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const films = await getWatchList(userId);

    const filmsData = await axios
      .all(films!.watchlist.map((item) => axios.get(endpoints.mainInfo + item)))
      .then(
        axios.spread((...res) => {
          return res.map((item) => {
            item.data.chosen = true;
            return item.data;
          });
        })
      );
    res.json({ filmsData });
  } catch (err) {
    next(err);
  }
});
filmRouter.post("/deleteFromWatchlist", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const filmId = req.body.filmId;
    const films = await getWatchList(userId);
    await deleteFilmFromWatchlist(userId, filmId, films!.watchlist);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default filmRouter;
