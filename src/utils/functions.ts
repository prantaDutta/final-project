import dayjs from "dayjs";
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "./constants";

export const verifyJWTToken = (accessToken: string) => {
  try {
    var decoded = verify(accessToken, ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    return err;
  }
};

export const formatDate = (date: Date, formatter: string) =>
  dayjs(date).format(formatter);

export const eightennYearsBackFromNow = (formatter: string) =>
  dayjs().subtract(18, "year").format(formatter);

export const objectToArray = (obj: Record<any, any>) =>
  Object.keys(obj).map((key) => [key, obj[key]]);

export const isEmptyObj = (obj: Record<any, any>) =>
  Object.keys(obj).length === 0;

export const isObject = (obj: any) =>
  obj != null && obj.constructor.name === "Object";

export const isServer = () => typeof window === "undefined";

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const filesToObject = (files: [File]) => {
  const fileLists = Array.from(files);
  return { ...fileLists };
};

export const fileToObject = (file: File) => {
  var fileData = {
    modified: file.lastModified,
    name: file.name,
    size: file.size,
    type: file.type,
  };
  return fileData;
};

// export function formDataToObject(object: Object) {
//   const formData = new FormData();
//   Object.keys(object).forEach((key) => formData.append(key, object[key]));
//   return formData;
// }

export const appendingFileToFormData = (
  name: string,
  files: [File][],
  formData: FormData
) => {
  for (let i = 0; i < files.length; i++) {
    formData.append(name, (files as any)[i]);
  }
  return formData;
};

export const appendingFieldsToFormData = (
  key: string,
  value: any,
  formData: FormData
) => {
  formData.append(key, value);
  return formData;
};
