import { useField } from "formik";
import React, { useEffect } from "react";
import ImageContainer from "../imageContainer/ImageContainer";
import Card from "../cards/Card";
import IconButton from "../IconButton/IconButton";
import { FaTimes } from "react-icons/fa";

const MultipleFileInput = ({ label, formik, ...props }) => {
  const [field, meta] = useField(props);
  const [selectedImages, setSelectedImages] = React.useState([]);

  const fieldChange = (e) => {
    // check if the files are already selected
    // if yes then remove it from the array
    // else add it to the array
    let newImages = [...selectedImages, ...e.target.files];

    let filteredImages = newImages.filter(
      (obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
    );

    setSelectedImages(filteredImages);

    formik.setFieldValue(field.name, filteredImages);
    // field.value = e.target.files[0];
    // setPreviewImg(URL.createObjectURL(e.target.files[0]));
    // console.log("field.value", field.value);
  };

  //   console.log("selectedImages", selectedImages);
  return (
    <div>
      <div>
        <h3
          className={`font-semibold text-sm mb-2 ${
            meta.error ? "text-error" : ""
          }`}
        >
          {label} {meta.error ? <span> - {meta.error}</span> : null}{" "}
        </h3>
      </div>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={props.id || props.name}
          className={`flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-primary/10 hover:bg-gray-100`}
        >
          <div
            className={`flex flex-col items-center justify-center pb-6 pt-5`}
          >
            <svg
              aria-hidden="true"
              className={`w-10 h-10 mb-3 text-gray-400`}
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

            <p className="mb-2 text-sm text-primary ">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>

            <p className="font-semibold text-sm text-gray-500">{label}</p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>

          <input
            type="file"
            onChange={fieldChange}
            id={props.id || props.name}
            // {...field}
            accept="image/png, image/jpeg, image/jpg, image/gif"
            multiple
            className="hidden"
            // {...field}
            {...props}
          />
        </label>
      </div>
      <div className="grid grid-cols-5 gap-4 py-4">
        {selectedImages.map((image) => (
          <Card
            classes={`relative ${
              (image.size / (1024 * 1024)).toFixed(2) > 5 &&
              "border-2 border-error"
            }`}
          >
            <IconButton
              className={
                "absolute -top-2 -right-2 z-10 h-5 w-5 text-xs flex items-center justify-center p-1"
              }
              color={`${
                (image.size / (1024 * 1024)).toFixed(2) > 5 ? "error" : "gray"
              }`}
              onClick={() => {
                setSelectedImages(
                  selectedImages.filter((img) => img !== image)
                );

                formik.setFieldValue(
                  field.name,
                  selectedImages.filter((img) => img !== image)
                );
              }}
            >
              <FaTimes />
            </IconButton>
            <ImageContainer src={URL.createObjectURL(image)} />
            <small className="text-xs text-gray-500">
              {" "}
              {(image.size / (1024 * 1024)).toFixed(2)}mb
            </small>
          </Card>
          //   <span>{URL.createObjectURL(image)}</span>
        ))}
      </div>
    </div>
  );
};

export default MultipleFileInput;
