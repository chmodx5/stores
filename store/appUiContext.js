import React from "react";

const appUiContext = React.createContext();

const AppUiProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <appUiContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </appUiContext.Provider>
  );
};

export { appUiContext, AppUiProvider };
