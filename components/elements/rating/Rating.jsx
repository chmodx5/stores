import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const Rating = ({ totalStars }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  totalStars = Math.round(totalStars);

  const handleClick = (value) => {
    setSelectedStars(value);
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const value = index + 1;
        return (
          <FaStar
            key={index}
            className={`cursor-pointer text-accent text-xl ${
              selectedStars <= value ? "fill-current" : "fill-gray-400"
            }`}
          />
        );
      })}
      {[...Array(5 - totalStars)].map((_, index) => {
        const value = index + 1;
        return (
          <FaRegStar
            key={index}
            className={`cursor-pointer text-gray-500 text-xl ${
              selectedStars <= value ? "fill-current" : "fill-gray-400"
            }`}
          />
        );
      })}

      <div className="text-gray-500">
        <p>( 10000 reviews )</p>
      </div>
    </div>
  );
};

export default Rating;
