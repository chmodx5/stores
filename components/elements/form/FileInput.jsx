import React, { useState } from "react";
import ImageContainer from "../imageContainer/ImageContainer";
import { IconButton } from "..";
import { FaUpload } from "react-icons/fa";
import { useField, useFormik } from "formik";

const FileInput = ({ label, formik, id, mini, noAspectRatio, ...props }) => {
  // let [previewImage, setPreviewImage] = useState("null");
  //create useFormik hook
  const [previewImg, setPreviewImg] = useState(null);

  const [field, meta] = useField(props);
  const fieldChange = (e) => {
    // console.log("field.value", e.target.files[0]);
    formik.setFieldValue(field.name, e.target.files[0]);
    field.value = e.target.files[0];
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
    // console.log("field.value", field.value);
  };
  return (
    <div className="block">
      <h3
        className={`font-semibold text-sm mb-2 ${
          meta.error ? "text-error" : ""
        }`}
      >
        {label} {meta.error ? <span> - {meta.error}</span> : null}{" "}
      </h3>
      {previewImg ? (
        <div className="relative">
          <ImageContainer src={previewImg} />
          <div className="absolute  top-5 right-5">
            <label htmlFor={props.id || props.name}>
              <div className="bg-primary  w-8 h-8 rounded-xl shadow hover:shadow-xl text-white flex items-center justify-center hover:cursor-pointer hover:bg-primary/80 ">
                <FaUpload />
              </div>
            </label>
            <input
              className="hidden"
              type="file"
              onChange={fieldChange}
              id={props.id || props.name}
              // {...field}
              {...props}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={props.id || props.name}
            className={`flex flex-col items-center justify-center w-full ${
              noAspectRatio ? " " : "aspect-square"
            } border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-primary/10 hover:bg-gray-100`}
          >
            <div
              className={`flex flex-col items-center justify-center  ${
                mini ? "pb-0 pt-0" : "pb-6 pt-5"
              }`}
            >
              <svg
                aria-hidden="true"
                className={`${
                  mini ? "w-8 h-8" : "w-10 h-10 mb-3"
                } text-gray-400`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              {!mini && (
                <p className="mb-2 text-sm text-primary ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              )}
              <p className="font-semibold text-sm text-gray-500">{label}</p>
              {!mini && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              )}
            </div>

            <input
              type="file"
              onChange={fieldChange}
              id={props.id || props.name}
              // {...field}
              className="hidden"
              {...props}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default FileInput;
