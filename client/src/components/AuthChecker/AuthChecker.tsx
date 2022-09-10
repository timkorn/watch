import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getCookie from "../../../utils/getCookie";
import { refresh, changeRefresher } from "../../features/authSlice";
import { AppDispatch, RootState } from "../../store";
interface AuthCheckerProps {
  children: ReactNode;
}
const PUBLIC_PATHS = ["/login", "/register"];

const checkPublickPath = (url: string) => {
  const path = url.split("?")[0];
  return PUBLIC_PATHS.includes(path);
};

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((store: RootState) => store.auth.userId);
  const router = useRouter();
  function authCheck(url: string) {
    if (
      (!checkPublickPath(url) && getCookie("accessToken") === null) ||
      getCookie("refreshToken") === null
    ) {
      router.push("/login");
    } else {
      if (
        getCookie("accessToken") !== null &&
        getCookie("refreshToken") !== null
      ) {
        dispatch(refresh());
      }
    }
  }
  useEffect(() => {
    if (userId !== null) {
      console.log("1 mitute to refresh");
      const interval = setInterval(() => {
        dispatch(refresh());
      }, 1000 * 60 * 4);
      dispatch(changeRefresher(interval));
    }
  }, [userId]);
  useEffect(() => {
    if (!(typeof window === "undefined")) {
      authCheck(router.asPath);
    }
  }, []);

  return (
    <>{userId || checkPublickPath(router.asPath) ? children : "Loading..."}</>
  );
};
export default AuthChecker;
