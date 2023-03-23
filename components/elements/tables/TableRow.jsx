import React from "react";

const TableRow = ({ children, ...props}) => {
  return (
    <tr
      className="bg-white border-b  rounded-full hover:bg-gray-100"
      {...props}
    >
      {children}
    </tr>
  );
};

export default TableRow;
