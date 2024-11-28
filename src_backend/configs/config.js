import {config} from "dotenv";
import * as process from "process";

config();

export const configs = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [],
    BACK_END_HOST: process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : null,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS),

};

