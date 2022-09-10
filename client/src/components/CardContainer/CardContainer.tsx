import React, { ReactNode, RefObject } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import s from "./CardContainer.module.css";

interface CardContainerProps {
  children: ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  return (
    <div className={s.root} ref={parent}>
      {children}
    </div>
  );
};
export default CardContainer;
