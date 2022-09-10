import React from "react";
import cn from "classnames";
import s from "./Button.module.css";
interface ButtonProps {
  classNames?: string;
  children: string;
  variant?: "outlined" | "text" | "contained";
}

const Button: React.FC<ButtonProps> = ({
  classNames,
  children,
  variant = "contained",
}) => {
  return (
    <button className={cn(s.root, classNames, s[variant])}>{children}</button>
  );
};
export default Button;
