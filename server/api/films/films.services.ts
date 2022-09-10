import db from "../../utils/db";

function addFilmToWatchlist(id: string, filmId: string) {
  return db.user.update({
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

function getWatchList(id: string) {
  return db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      watchlist: true,
    },
  });
}

function deleteFilmFromWatchlist(id: string, filmId: string, films: string[]) {
  return db.user.update({
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

export { addFilmToWatchlist, getWatchList, deleteFilmFromWatchlist };
