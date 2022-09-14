import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../../components/Nav";
import s from "../../../styles/Film.module.css";

import Wrapper from "../../components/Wrapper";
import Heading from "../../components/Heading";
import AddWatchlist from "../../components/AddWatchlist";
import InfoText from "../../components/InfoText";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  cleanInfo,
  getMainInfo,
  getStaff,
} from "../../features/filmPageInfoSlice";
import { useRouter } from "next/router";
import FilmInfo from "../../components/FilmInfo";
import Skeleton from "react-loading-skeleton";
import Loading from "../../components/Loading";
import Loader from "../../components/Loader";

const FilmPage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    additionalInfo,
    filmMainInfo,
    isAdditionalInfoLoading,
    isMainInfoLoading,
  } = useSelector((store: RootState) => store.filmInfo);
  const { userId } = useSelector((store: RootState) => store.auth);
  const container = useRef<HTMLDivElement | null>(null);
  const text = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (router.query.filmId) {
      const data = router.query as { filmId: string; [x: string]: any };
      dispatch(
        getMainInfo({ filmId: router.query.filmId as string, userId: userId! })
      );
      dispatch(getStaff(data));
    } else {
      router.push("/");
    }
    return () => {
      dispatch(cleanInfo());
    };
  }, []);
  useEffect(() => {
    if (!isMainInfoLoading) {
      if (container.current!.clientWidth < text.current!.clientWidth) {
        text.current!.classList.add("animate");
      }
    }
  }, [isMainInfoLoading]);
  return (
    <Wrapper>
      <Wrapper.Header headerStyles={s.header}>
        <Nav names={["Home", "Watchlist"]} links={["/", "/watchlist"]} />
      </Wrapper.Header>
      <Wrapper.Main classNames={s.main}>
        {(isMainInfoLoading || isAdditionalInfoLoading) && <Loader size={40} />}
        <div className={s.filmContainer}>
          <div className={s.posterContainer}>
            {!isMainInfoLoading && (
              <img className={s.poster} src={filmMainInfo!.posterUrl} />
            )}
            <div className={s.content}>
              <div className={s.name}>
                {!isMainInfoLoading && (
                  <div className={s.header1} ref={container}>
                    <span ref={text}>
                      {filmMainInfo!.nameOriginal || filmMainInfo!.nameRu}
                    </span>
                  </div>
                )}
                {!isMainInfoLoading && (
                  <AddWatchlist
                    chosen={filmMainInfo!.chosen}
                    classNames={s.watchlist}
                    filmId={filmMainInfo!.kinopoiskId}
                    pending={
                      typeof filmMainInfo.pending === "undefined"
                        ? false
                        : filmMainInfo.pending
                    }
                    type="filmPage"
                  />
                )}
              </div>
              {!isMainInfoLoading && filmMainInfo!.ratingKinopoisk && (
                <div className={s.rating}>
                  <img src="/Rating.svg" className={s.star} />
                  <span className={s.mark}>
                    {filmMainInfo!.ratingKinopoisk}
                  </span>
                </div>
              )}
            </div>
          </div>
          {!(isAdditionalInfoLoading || isMainInfoLoading) && (
            <FilmInfo
              actors={additionalInfo!
                .slice(1)
                .map((item) => item.nameEn || item.nameRu)}
              ageRating={filmMainInfo!.ratingAgeLimits || "-"}
              directorName={
                additionalInfo![0].nameEn || additionalInfo![0].nameRu
              }
              votesCount={filmMainInfo!.reviewsCount}
            />
          )}
        </div>
      </Wrapper.Main>
    </Wrapper>
  );
};

export default FilmPage;
