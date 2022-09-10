import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import s from "./AuthPageWrapper.module.css";
interface AuthPageWrapperProps {
  children: ReactNode;
  type: "login" | "register";
}

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({
  children,
  type,
}) => {
  const router = useRouter();
  return (
    <div className={s.root}>
      <img src={"/Logo.svg"} className={s.image} />
      <div className={s.authContainer}>{children}</div>
      <div className={s.addInf}>
        {type == "login" ? (
          <>
            <p>No account?</p>
            <p
              onClick={() => {
                router.push("/register");
              }}
            >
              Register
            </p>
          </>
        ) : (
          <>
            <p>Have an account?</p>
            <p
              onClick={() => {
                router.push("login");
              }}
            >
              Login
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default AuthPageWrapper;
