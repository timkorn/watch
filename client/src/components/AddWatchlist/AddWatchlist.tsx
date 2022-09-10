import React, { useEffect, useState } from "react";
import cn from "classnames";
import s from "./AddWatchlist.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  deleteFromWatchList,
  removeElement,
} from "../../features/watchlistSlice";
import { AppDispatch, RootState } from "../../store";
import { deleteChosen, makeChosen } from "../../features/searchFilmsSlice";
import {
  deleteFilmChosen,
  makeFilmChosen,
} from "../../features/filmPageInfoSlice";
interface AddWatchlistProps {
  classNames: string;
  chosen: boolean;
  filmId: string;
  pending: boolean;
  type?: "search" | "watchlist" | "filmPage";
}

const AddWatchlist: React.FC<AddWatchlistProps> = ({
  classNames,
  chosen,
  filmId,
  pending,
  type = "search",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useSelector((store: RootState) => store.auth);
  const handleClick = (event: any) => {
    event.stopPropagation();
    if (type === "search") {
      dispatch(makeChosen(filmId));
    } else {
      dispatch(makeFilmChosen());
    }
    dispatch(addToWatchlist({ filmId, userId: userId! }));
  };
  const handleDelete = (event: any) => {
    event.stopPropagation();
    if (type === "watchlist") {
      console.log(filmId);
      dispatch(removeElement(filmId));
    } else if (type === "filmPage") {
      dispatch(deleteFilmChosen());
    } else {
      dispatch(deleteChosen(filmId));
    }
    dispatch(deleteFromWatchList({ filmId, userId: userId! }));
  };
  return (
    <div
      className={cn(classNames, s.root, chosen && s.chosen)}
      onClick={chosen ? (pending ? undefined : handleDelete) : handleClick}
    >
      <img src={chosen ? "/AddWatchlistChosen.svg" : "/AddWatchlist.svg"} />
    </div>
  );
};
export default AddWatchlist;
