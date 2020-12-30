export const isProduction = process.env.NODE_ENV === "production";

export const baseURL = isProduction
  ? "https://grayscale-final.vercel.app"
  : "http://localhost:3000";

export const SUPPORTED_IMAGE_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const AUTH_TOKEN_NAME = process.env.AUTH_TOKEN_NAME!;
