export const isProduction = process.env.NODE_ENV === "production";

export const BASE_URL = "http://localhost:3000";

export const BASE_API_URL = "http://localhost:8000";

export const isServer = !process.browser;

export const SUPPORTED_IMAGE_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const AUTH_TOKEN_NAME = process.env.AUTH_TOKEN_NAME!;

export const FAUNA_ADMIN_KEY = process.env.FUANA_ADMIN_KEY!;

export const uuidFormatRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const NEXT_IRON_SESSION_CONFIG = {
  cookieName: "grayscale",
  cookieOptions: {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict" as "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    // secure: process.env.NODE_ENV === "production" ? true : false,
  },
  password: process.env.APPLICATION_SECRET!,
};
