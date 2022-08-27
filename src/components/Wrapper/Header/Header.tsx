import React, { ReactNode } from "react";
import cn from "classnames";
import s from "./Header.module.css";

interface HeaderProps {
  children: ReactNode;
  contentStyles?: string;
  headerStyles?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  contentStyles,
  headerStyles,
}) => {
  return (
    <header className={cn(s.root, headerStyles)}>
      <img src="/Logo.svg" />
      <div className={cn(s.content, contentStyles)}>{children}</div>
    </header>
  );
};
export default Header;
