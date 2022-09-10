import React, { ReactNode } from "react";
import cn from "classnames";
import s from "./Button.module.css";
import Loader from "../Loader";
interface ButtonProps {
  classNames?: string;
  children: ReactNode;
  variant?: "outlined" | "text" | "contained";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  classNames,
  children,
  variant = "contained",
  loading = false,
}) => {
  return (
    <button
      className={cn(s.root, classNames, s[variant], loading && s.disabled)}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader size={25} color={"white"} />
          <span className={s.loadingWord}>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
