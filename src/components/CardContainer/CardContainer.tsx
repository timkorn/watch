import React, { ReactNode } from "react";
import s from "./CardContainer.module.css";
interface CardContainerProps {
  children: ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return <div className={s.root}>{children}</div>;
};
export default CardContainer;
