import React from "react";

const storeContext = React.createContext();

const StoreProvider = ({ children }) => {
  const [store, setStore] = React.useState("store");

  return (
    <storeContext.Provider value={{ store, setStore }}>
      {children}
    </storeContext.Provider>
  );
};

export { storeContext, StoreProvider };
