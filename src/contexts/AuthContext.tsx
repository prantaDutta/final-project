import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { isProduction } from "../utils/constants";

type authValues = {
  isAuthenticated: boolean;
  toggleAuth: (value: boolean) => void;
};

export const authContext = createContext({} as authValues);

interface authContextProps {}

const authContextProvider: React.FC<authContextProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const toggleAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`/api/is-authenticated`);
      if (data?.token) {
        return toggleAuth(true);
      }
    } catch (e) {
      if (!isProduction) console.log(e);
    }
    toggleAuth(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <authContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {props.children}
    </authContext.Provider>
  );
};

export default authContextProvider;
