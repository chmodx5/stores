import React from "react";
import { SingleStoreCard } from "../../elements";

const GuestFeaturedStores = ({ stores }) => {
  return (
    <section className="py-10">
      <div className="">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-primary">Featured</span> stores
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2">
          {stores.length > 0 &&
            stores.map((store) => (
              <SingleStoreCard store={store} key={store.id} />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default GuestFeaturedStores;
