import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddWatchlist from "../AddWatchlist";
import s from "./Card.module.css";
interface CardProps {
  film: any;
  loading: boolean;
  type?: "search" | "watchlist";
  id: string;
}

const Card: React.FC<CardProps> = ({ film, loading, type = "search", id }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/film/${id}`);
  };
  const container = useRef<HTMLDivElement | null>(null);
  const text = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!loading) {
      if (container.current!.clientWidth < text.current!.clientWidth) {
        text.current!.classList.add("animate");
      }
    }
  }, [loading]);
  if (loading) {
    return <Skeleton className={s.skeleton} />;
  }
  return (
    <div className={s.root} onClick={handleClick}>
      <div className={s.image}>
        <img src={film.posterUrl} />
      </div>
      <div className={s.content}>
        <AddWatchlist
          classNames={s.flag}
          chosen={film.chosen}
          filmId={id}
          type={type}
          pending={typeof film.pending === "undefined" ? false : film.pending}
        />
        <div className={s.header} ref={container}>
          <span ref={text}>
            {film.nameOriginal || film.nameEn || film.nameRu}
          </span>
        </div>
        <span className={s.year}>({film.year})</span>
        <div className={s.rating}>
          <img src="/Rating.svg" />
          <span className={s.mark}>
            {(type === "search" && film.rating === "null") ||
            (type === "watchlist" && !film.ratingKinopoisk)
              ? "-"
              : type === "search"
              ? film.rating
              : film.ratingKinopoisk}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Card;
