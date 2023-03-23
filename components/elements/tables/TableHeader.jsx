import React from "react";

const TableHeader = ({ children }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100 h-16 rounded-xl">
      {children}
    </thead>
  );
};

export default TableHeader;
