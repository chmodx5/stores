import React from "react";

const TextAreaInput = ({ className, label, ...props }) => {
  return (
    <div className={`${className}`}>
      <div className="mb-2 block font-semibold text-sm">
        <label htmlFor="" value="Your email">
          {label}
        </label>
      </div>
      <input {...props} />
    </div>
  );
};

export default TextAreaInput;
