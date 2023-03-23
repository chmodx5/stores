import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const TextInput = ({ className, rich, label, ...props }) => {
  return (
    <div className={`${className}`}>
      <div className="mb-2 block font-semibold text-sm">
        <label htmlFor="" value="Your email">
          {label}
        </label>
      </div>
      {/* check if we are in the browser then render the react quill */}
      {typeof window !== "undefined" && (
        <>
          {rich ? (
            <ReactQuill {...props} className="h-56 rounded-xl" {...props} />
          ) : (
            <textarea {...props} />
          )}
        </>
      )}
    </div>
  );
};

export default TextInput;
