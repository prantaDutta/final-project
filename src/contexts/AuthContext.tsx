import Axios from "axios";
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
        const res = await Axios.get(baseURL + "/api/is-authenticated");
        if (res.data.token) {
          const token = verifyJWTToken(res.data.token);
          console.log("token: ", token);
        } else {
          toggleAuth(false);
        }
      } catch (e) {
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
