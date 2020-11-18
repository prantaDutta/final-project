import { createContext, useEffect, useState } from "react";
import { verifyJWTToken } from "../utils/functions";

export const AuthContext = createContext({
  isAuthenticated: false,
});

interface authContextProps {}

const AuthContextProvider: React.FC<authContextProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const localData = localStorage.getItem("authToken");
    // if (localData)

    // console.log("localData: ", localData);

    // localData ? console.log(JSON.parse(localData)) : null;

    const auth = localData ? verifyJWTToken(JSON.parse(localData)) : false;

    return auth ? setIsAuthenticated(true) : setIsAuthenticated(false);
  });
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
