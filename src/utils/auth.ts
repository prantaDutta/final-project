import { laravelApi } from "./api";
import axios from "axios";

export const logout = async () => {
  try {
    await laravelApi(true).get("/sanctum/csrf-cookie");
    await laravelApi().post(`/logout`);
    await axios.post("/api/set-user-cookie");
  } catch (e) {
    console.log(e.response);
  }
};
