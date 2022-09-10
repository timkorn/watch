import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import s from "../../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import CardContainer from "../components/CardContainer";
import SearchField from "../components/SearchField";
import Wrapper from "../components/Wrapper";
import { getWatchlist } from "../features/watchlistSlice";
import { AppDispatch, RootState } from "../store";
import Heading from "../components/Heading";

const Watchlist: NextPage = () => {
  const { isLoading, watchlist } = useSelector(
    (store: RootState) => store.watchlist
  );
  const router = useRouter();
  const { userId } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getWatchlist({ userId: userId! }));
  }, []);
  return (
    <div>
      <Wrapper>
        <Wrapper.Header>
          <div></div>
          <img
            src="/AddWatchlistChosen.svg"
            height="26px"
            onClick={() => {
              router.push("/");
            }}
            className={s.flag}
          />
        </Wrapper.Header>
        <Wrapper.Main>
          {isLoading == false && watchlist?.length == 0 ? (
            <Heading level={2}>No films</Heading>
          ) : (
            <CardContainer>
              {isLoading
                ? [1, 2, 3, 4].map((item: any) => (
                    <Card
                      film={{}}
                      key={item}
                      loading={true}
                      id={item.kinopoiskId}
                    />
                  ))
                : watchlist!.map((item: any) => (
                    <Card
                      film={item}
                      id={item.kinopoiskId}
                      key={item.kinopoiskId}
                      loading={false}
                      type="watchlist"
                    />
                  ))}
            </CardContainer>
          )}
        </Wrapper.Main>
      </Wrapper>
    </div>
  );
};

export default Watchlist;
