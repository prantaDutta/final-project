import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { baseURL } from "../utils/constants";
import fetch from "isomorphic-unfetch";
import { ModifiedUserData } from "../utils/randomTypes";

type authValues = {
  isAuthenticated: boolean;
  userData: ModifiedUserData | null;
  toggleAuth: (value: boolean) => void;
  setUserData: Dispatch<SetStateAction<ModifiedUserData | null>>;
};

export const AuthContext = createContext({} as authValues);

interface authContextProps {}

const AuthContextProvider: React.FC<authContextProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | ModifiedUserData>(null);

  const toggleAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  useEffect(() => {
    const func = async () => {
      const response = await fetch(`${baseURL}/api/is-authenticated`);
      const res = await response.json();
      if (res.token) {
        toggleAuth(true);
      } else {
        toggleAuth(false);
      }
    };
    func();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, toggleAuth, userData, setUserData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
