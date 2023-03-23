import React from "react";

const TableWrapper = ({ children }) => {
  return (
    <div className="relative shadow overflow-x-auto rounded-xl">
      <table className="w-full text-sm text-left text-gray-500 ">
        {children}
      </table>
    </div>
  );
};

export default TableWrapper;
