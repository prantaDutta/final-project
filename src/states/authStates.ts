import { atom, selector } from "recoil";
import { baseURL } from "../utils/constants";

export const auth = atom({
  key: "is-authenticated",
  default: false,
});

export const authStatus = selector<boolean>({
  key: "auth-status",
  get: () => {
    try {
      fetch(baseURL + "/api/is-authenticated", {
        method: "GET",
        credentials: "include",
      });
      return true;
    } catch (e) {
      return false;
    }
  },
  set: ({ get, set }) => {
    const currentAuth = get(auth);
    console.log("currentAuth: ", currentAuth);
    set(authStatus, !currentAuth);
  },
});
