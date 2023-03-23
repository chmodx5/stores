import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import ImageContainer from "../imageContainer/ImageContainer";
import Card from "./Card";
import moment from "moment";
import Link from "next/link";

const SingleStoreCard = ({ store }) => {
  return (
    <Card classes={"p-6"} href={`/${store.slug}`}>
      <div className="flex space-x-6">
        <div className="w-24">
          <ImageContainer
            src={`${
              store.logo
                ? "http://localhost:5000/images/" + store.log
                : "/placeholders/store-placeholder.png"
            }`}
          />
        </div>
        <div>
          <Link href={`/${store.slug}`} className="group">
            <h3 className="font-semibold text-lg capitalize group-hover:underline">
              {store.name}
            </h3>
            <small>{moment(store.createdAt).fromNow()}</small>
          </Link>
          <p className="text-gray-500 text-sm mt-2">{store.description}</p>
          <div className="flex space-x-2 items-center mt-2">
            <FaMapMarkedAlt />
            <p className="capitalize">{store.location}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SingleStoreCard;
