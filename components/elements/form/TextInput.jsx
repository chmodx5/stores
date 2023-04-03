import { useField } from "formik";
import React from "react";

const TextAreaInput = ({ textArea, label, ...props }) => {
  const [field, meta] = useField(props);

  const InputElement = textArea ? "textarea" : "input";
  return (
    <div className={``}>
      <div className="mb-2 block font-semibold text-sm">
        <label
          className={`${meta.touched && meta.error ? "text-error" : ""}`}
          htmlFor={props.id || props.name}
          value="Your email"
        >
          {label}
        </label>
      </div>
      <InputElement
        className={`${
          meta.touched && meta.error
            ? "border-error outline-error border-2"
            : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextAreaInput;
