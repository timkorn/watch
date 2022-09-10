import React from "react";
import Skeleton from "react-loading-skeleton";
import InfoText from "../InfoText";
import s from "./FilmInfo.module.css";
interface FilmInfoProps {
  directorName: string;
  ageRating: string;
  actors: string[];
  votesCount: string;
}

const FilmInfo: React.FC<FilmInfoProps> = ({
  actors,
  directorName,
  ageRating,
  votesCount,
}) => {
  return (
    <div className={s.info}>
      <div className={s.infoContent}>
        <InfoText content={directorName} name="Director" />
        <InfoText content={actors.join(", ")} name="Actors" />
        <InfoText content={ageRating} name="Age rating" />
        <InfoText content={votesCount} name="Reviews count" />
      </div>
    </div>
  );
};
export default FilmInfo;
