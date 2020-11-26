import { createContext, useEffect, useState } from "react";
import { verifyJWTToken } from "../utils/functions";

type authValues = {
  isAuthenticated: boolean;
  user: {};
  toggleAuth: () => void;
};

export const AuthContext = createContext({} as authValues);

interface authContextProps {}

const AuthContextProvider: React.FC<authContextProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState({});

  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);

  useEffect(() => {
    const localData = localStorage.getItem("authToken");
    if (localData) {
      const res = verifyJWTToken(JSON.parse(localData));
      if ((res as any).err) {
        console.log("Not Authenticated");
      } else if ((res as any).user) {
        setIsAuthenticated(true);
        setUser((res as any).user);
      }
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, toggleAuth: toggleAuth, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
