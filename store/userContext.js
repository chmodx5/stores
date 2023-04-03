import { useSession } from "next-auth/react";
import React from "react";

const userContext = React.createContext();

const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState("USER");
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [fetchUserError, setFetchUserError] = React.useState("");

  const { data: session } = useSession();

  return (
    <userContext.Provider value={{ user, isAuthenticated, userRole, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export { userContext, UserProvider };
