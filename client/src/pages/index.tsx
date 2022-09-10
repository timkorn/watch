import type { NextPage } from "next";
import Head from "next/head";
import s from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import CardContainer from "../components/CardContainer";
import SearchField from "../components/SearchField";
import Wrapper from "../components/Wrapper";
import { searchFilms, setMakeSearch } from "../features/searchFilmsSlice";
import { AppDispatch, RootState } from "../store";
import Heading from "../components/Heading";
import { logout } from "../features/authSlice";

const Home: NextPage = () => {
  const { isLoading, isFilmsSearch, searchedFilms } = useSelector(
    (store: RootState) => store.searchOfFilms
  );
  const { userId } = useSelector((store: RootState) => store.auth);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const handleSearchSubmit = (value: string) => {
    const data = { search: value, userId: userId! };
    dispatch(setMakeSearch());
    dispatch(searchFilms(data));
  };
  return (
    <div>
      <Wrapper>
        <Wrapper.Header>
          <SearchField handleSubmit={handleSearchSubmit} />
          <div className={s.headerContainer}>
            <img
              src="/AddWatchlist.svg"
              height="26px"
              onClick={() => {
                router.push("/watchlist");
              }}
              className={s.flag}
            />
            <p
              className={s.logout}
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </p>
          </div>
        </Wrapper.Header>
        <Wrapper.Main>
          <CardContainer>
            {isFilmsSearch ? (
              <>
                {isLoading
                  ? [1, 2, 3, 4].map((item: any) => (
                      <Card
                        film={{}}
                        key={item}
                        loading={true}
                        id={item.filmId}
                      />
                    ))
                  : searchedFilms!.map((item: any) => (
                      <Card
                        film={item}
                        key={item.filmId}
                        loading={false}
                        id={item.filmId}
                      />
                    ))}
              </>
            ) : (
              <Heading level={2}>Make a search</Heading>
            )}
          </CardContainer>
        </Wrapper.Main>
      </Wrapper>
    </div>
  );
};

export default Home;
