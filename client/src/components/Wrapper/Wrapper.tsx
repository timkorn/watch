import React, { ReactNode } from "react";
import Header from "./Header";
import Main from "./Main";
import s from "./Wrapper.module.css";
interface WrapperProps {
  children: ReactNode;
}

interface WrapperExtention {
  Main: typeof Main;
  Header: typeof Header;
}
const Wrapper: React.FC<WrapperProps> & WrapperExtention = ({ children }) => {
  return <div className={s.root}>{children}</div>;
};
Wrapper.Main = Main;
Wrapper.Header = Header;

export default Wrapper;
