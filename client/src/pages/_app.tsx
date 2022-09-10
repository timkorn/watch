import "../../styles/globals.css";
import { RootState, store } from "../store";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getCookie from "../../utils/getCookie";
import AuthChecker from "../components/AuthChecker";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthChecker>
        <SkeletonTheme baseColor="#FFFFFF" highlightColor="#e0e9f5">
          <Component {...pageProps} />
          <ToastContainer />
        </SkeletonTheme>
      </AuthChecker>
    </Provider>
  );
}

export default MyApp;
