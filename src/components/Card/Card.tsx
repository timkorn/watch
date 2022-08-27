import React from "react";
import AddWatchlist from "../AddWatchlist";
import s from "./Card.module.css";
interface CardProps {}

const Card: React.FC<CardProps> = ({}) => {
  return (
    <div className={s.root}>
      <div className={s.image}>
        <img src="/CardPic.svg" />
      </div>
      <div className={s.content}>
        <AddWatchlist classNames={s.flag} chosen={false} />
        <div className={s.header}>
          <h1>Avatar</h1>
          <span className={s.year}>(2009)</span>
        </div>
        <div className={s.rating}>
          <img src="/Rating.svg" />
          <span className={s.mark}>8.9</span>
        </div>
        <span className={s.dir}>director: Timur Kornilov</span>
        <span className={s.stars}>thliller drama</span>
      </div>
    </div>
  );
};
export default Card;
