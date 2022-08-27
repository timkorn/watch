import React from "react";
import Heading from "../Heading";
import s from "./InfoText.module.css";
interface InfoTextProps {
  name: string;
  content: string;
}

const InfoText: React.FC<InfoTextProps> = ({ name, content }) => {
  return (
    <div className={s.root}>
      <Heading level={3} className={s.heading}>
        {name + ":"}
      </Heading>
      <Heading className={s.content} level={4}>
        {content}
      </Heading>
    </div>
  );
};
export default InfoText;
