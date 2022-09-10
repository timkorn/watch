import React from "react";
import cn from "classnames";
import s from "./Input.module.css";
import { FieldHookConfig, useField } from "formik";

const Input = (props: any) => {
  const sett: FieldHookConfig<any> = props.field;
  const [field, meta] = useField(sett);
  const error = meta.touched && meta.error;
  return (
    <div className={s.inputContainer} key={field.name}>
      <input
        autoComplete="off"
        className={cn(s.root, props.classNames, error && s.error)}
        type="text"
        {...field}
        {...props}
      />
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  );
};
export default Input;
