import React from "react";
import Card from "./Card"

const FormWrapperCard = ({children, classes}) => {
  return <Card classes={`p-8 ${classes}`}>{children}</Card>;
};

export default FormWrapperCard;
