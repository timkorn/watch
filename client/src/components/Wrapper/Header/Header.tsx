import React, { ReactNode } from "react";
import cn from "classnames";
import s from "./Header.module.css";
import { useRouter } from "next/router";

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
  const router = useRouter();
  return (
    <header className={cn(s.root, headerStyles)}>
      <img
        src="/Logo.svg"
        onClick={() => {
          router.push("/");
        }}
        className={s.logo}
      />
      <div className={cn(s.content, contentStyles)}>{children}</div>
    </header>
  );
};
export default Header;
