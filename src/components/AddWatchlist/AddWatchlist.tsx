import React from "react";
import cn from "classnames";
import s from "./AddWatchlist.module.css";
interface AddWatchlistProps {
  classNames: string;
  chosen: boolean;
}

const AddWatchlist: React.FC<AddWatchlistProps> = ({ classNames, chosen }) => {
  return (
    <div className={cn(classNames, s.root, chosen && s.chosen)}>
      <img src={chosen ? "/AddWatchlistChosen.svg" : "/AddWatchlist.svg"} />
    </div>
  );
};
export default AddWatchlist;
