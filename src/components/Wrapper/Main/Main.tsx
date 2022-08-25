import React, { ReactNode } from "react";
import s from "./Main.module.css";
import cn from "classnames";
interface MainProps {
  children: ReactNode;
  classNames?: string;
}

const Main: React.FC<MainProps> = ({ children, classNames }) => {
  return <div className={cn(s.root, classNames)}>{children}</div>;
};
export default Main;
