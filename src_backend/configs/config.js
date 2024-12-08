import { config } from "dotenv";
import * as process from "process";

config();

export const configs = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    ALLOWED_ORIGINS:process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [],
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
    GOOGLE_CLIENT_ID:process.env.REACT_APP_GOOGLE_AUTH_KEY,
    SUPER_USER_NAME:process.env.SUPER_USER_NAME || "superuser",
    SUPER_USER_EMAIL:process.env.SUPER_USER_EMAIL || "andrew_100@gmail.com",
    SUPER_USER_PASSWORD:process.env.SUPER_USER_PASSWORD || "A123456789$",
    DEFAULT_ROLES:"[{\"title\":\"guest\",\"rate\":100},{\"title\":\"admin\",\"rate\":0},{\"title\":\"manager\",\"rate\":5},{\"title\":\"user\",\"rate\":10}]\n"


};

