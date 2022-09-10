import React from "react";
import Heading from "../Heading";
import { useRouter } from "next/router";
import s from "./Nav.module.css";

interface NavProps {
  names: string[];
  links: string[];
}

const Nav: React.FC<NavProps> = ({ names, links }) => {
  const router = useRouter();
  return (
    <nav className={s.root}>
      {names.map((item, i) => (
        <li
          onClick={() => {
            router.push(links[i]);
          }}
          key={i}
        >
          <Heading level={2} className={s.heading}>
            {item}
          </Heading>
        </li>
      ))}
    </nav>
  );
};
export default Nav;
