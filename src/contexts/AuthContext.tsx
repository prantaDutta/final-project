import Axios from "axios";
import { config } from "process";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { baseURL } from "../utils/constants";
import { verifyJWTToken } from "../utils/functions";

type authValues = {
  isAuthenticated: boolean;
  userId: number | null;
  toggleAuth: (value: boolean) => void;
  setUserId: Dispatch<SetStateAction<number | null>>;
};

export const AuthContext = createContext({} as authValues);

interface authContextProps {}

const AuthContextProvider: React.FC<authContextProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<null | number>(null);

  const toggleAuth = (value: boolean) => setIsAuthenticated(value);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await Axios.get(baseURL + "/api/is-authenticated", {
          withCredentials: true,
        });
        // console.log("data: ", res.data);
        if (res.data.token) {
          toggleAuth(true);
          // console.log("token: ", res.data.token);
        } else {
          toggleAuth(false);
        }
      } catch (e) {
        setIsAuthenticated(false);
        console.log(e);
      }
    };
    func();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, toggleAuth, userId, setUserId }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
