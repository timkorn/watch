import s from "./Heading.module.css";
import cn from "classnames";
import React from "react";

interface HeadingProps {
  children: string;
  level: number;
  className?: string;
  variant?: string;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  level,
  className,
  variant,
}) => {
  const el = `h${level}`;
  return React.createElement(
    el,
    {
      className: cn(
        s.root,
        s[`level${level}`],
        className,
        variant && s[variant]
      ),
    },
    children
  );
};
export default Heading;
