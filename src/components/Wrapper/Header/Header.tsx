import React, { ReactNode } from "react";
import cn from "classnames";
import s from "./Header.module.css";

interface HeaderProps {
  children: ReactNode;
  contentStyles?: string;
}

const Header: React.FC<HeaderProps> = ({ children, contentStyles }) => {
  return (
    <header className={s.root}>
      <img src="/Logo.svg" />
      <div className={cn(s.content, contentStyles)}>{children}</div>
    </header>
  );
};
export default Header;
