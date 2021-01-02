import faunadb from "faunadb";
import { FAUNA_ADMIN_KEY } from "../utils/constants";

export const q = faunadb.query;

export const client = new faunadb.Client({ secret: FAUNA_ADMIN_KEY });

export const getUserByIndex = async (email: string, index: string) => {
  const { data }: any = await client.query(
    q.Get(q.Match(q.Index(index), email))
  );
  return data;
};

export const sendDataToFauna = async (data: {}) => {
  const user: any = await client.query(
    q.Create(q.Collection("users"), {
      data,
    })
  );
  return user;
};
