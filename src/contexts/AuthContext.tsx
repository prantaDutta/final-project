import { createContext, useState } from "react";
import { useRecoilValue } from "recoil";
import { authenticatedUserData } from "../states/userStates";

type authValues = {
  isAuthenticated: boolean;
  toggleAuth: (value: boolean) => void;
};

export const authContext = createContext({} as authValues);

interface authContextProps {}

const authContextProvider: React.FC<authContextProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const userData = useRecoilValue(authenticatedUserData);
  const toggleAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  // const checkAuth = async () => {
  // try {
  //   const { data } = await axios.get(`/api/is-authenticated`);
  //   if (data?.token) {
  //     return toggleAuth(true);
  //   }
  // } catch (e) {
  //   if (!isProduction) console.log(e);
  // }
  // toggleAuth(false);
  // const { data } = await axios.get(`/api/is-authenticated`);
  // };

  // useEffect(() => {
  //   const ac = new AbortController();
  //   Promise.all([
  //     fetch(BASE_URL + "/api/is-authenticated", { signal: ac.signal }),
  //   ])
  //     .then(() => toggleAuth(true))
  //     .catch(() => toggleAuth(false));
  //   return () => ac.abort(); // Abort both fetches on unmount
  // }, []);

  // useEffect(() => {
  //   axios.get(`/api/is-authenticated`).then(({ data }) => {
  //     if (data?.token) {
  //       toggleAuth(true);
  //     } else {
  //       toggleAuth(false);
  //     }
  //   });
  // }, [userData]);

  return (
    <authContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {props.children}
    </authContext.Provider>
  );
};

export default authContextProvider;
