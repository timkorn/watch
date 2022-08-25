import React, { FormEvent, useRef } from "react";
import s from "./SearchField.module.css";
interface SearchFieldProps {
  handleSubmit: Function;
}

const SearchField: React.FC<SearchFieldProps> = ({ handleSubmit }) => {
  const onsubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (ref.current !== null) {
      handleSubmit(ref.current.value);
    }
  };
  const ref = useRef<JSX.IntrinsicElements["input"] | null>(null);
  return (
    <form className={s.form} onSubmit={onsubmit}>
      <input
        ref={ref}
        autocomplete="off"
        className={s.root}
        type="text"
        name="login"
        id="login"
        placeholder="Search"
      />
      <button className={s.button} type="submit">
        <img src="/Search.svg" />
      </button>
    </form>
  );
};
export default SearchField;
