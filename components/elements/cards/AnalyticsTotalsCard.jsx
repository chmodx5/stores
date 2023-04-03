import React from "react";
import Card from "./Card";

const AnalyticsTotalsCard = ({ label, value }) => {
  return (
    <Card classes={"p-6"}>
      <div className="mb-2">
        <h3 className="text-gray-700 capitalize">{label}</h3>
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{value}</h1>
      </div>
    </Card>
  );
};

export default AnalyticsTotalsCard;
