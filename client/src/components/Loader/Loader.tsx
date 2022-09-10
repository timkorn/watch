import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { CSSProperties } from "react";
interface LoaderProps {
  size: number;
  color?: string;
}
const makeSize = (size: number) => {
  return {
    position: "absolute",
    top: `calc(50% - ${(size * 1.22) / 2}px)`,
    left: `calc(50% - ${(size * 1.22) / 2}px)`,
  } as CSSProperties;
};

const Loader: React.FC<LoaderProps> = ({ size, color = "#312dd1" }) => {
  const css = makeSize(size);
  return (
    <MoonLoader cssOverride={css} size={size} loading={true} color={color} />
  );
};
export default Loader;
