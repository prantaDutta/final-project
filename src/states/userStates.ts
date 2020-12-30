import { atom } from "recoil";
import { ModifiedUserData } from "../utils/randomTypes";

export const authenticatedUserData = atom<ModifiedUserData | null>({
  key: "user-data",
  default: null,
});
